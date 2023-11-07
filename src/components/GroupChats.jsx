import "./GroupChats.css";
import React, { useState, useEffect } from "react";
import arrow from "../assets/arrow.png";

export default function GroupChats({ selectedGroup }) {
  const [receiveData, setReceiveData] = useState({
    name: "",
    initial: "",
    color: ""
  });
  
  const [content, setContent] = useState(""); // State to store textarea content
  const [contentList, setContentList] = useState([]); // State to store list of contents

  useEffect(() => {
    if (selectedGroup) {
      const savedGroupJSON = localStorage.getItem("selectedGroupMain");
      if (savedGroupJSON) {
        try {
          const savedGroup = JSON.parse(savedGroupJSON);
          
          setReceiveData({
            ...receiveData,
            name: savedGroup.groupName,
            initial: savedGroup.initial,
            color: savedGroup.groupColor
          });
  
          const key = `setContent_${savedGroup.groupName}`;
          const savedContent = localStorage.getItem(key);
          if (savedContent) {
            setContentList([savedContent]);
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    }
    
  }, [selectedGroup]);
  
  

  console.log(receiveData);


  
  const handleContent = () => {
    if (!content) return; // Don't add empty content

    const key = `setContent_${receiveName}`;
    const newContent = `${localStorage.getItem(key) || ""}\n${content}`;
    
    localStorage.setItem(key, newContent);
    setContentList((prevContentList) => [...prevContentList, newContent]);
    setContent("");
  };
const handleContentChange = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevents a newline character from being inserted
    handleContent();
  } else {
    const value = e.target.value;
    setContent(value);
  }
};

  
  function formatDateTime(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

    return <>{formattedTime}  <br /><br/> {formattedDate}</>;
  }

  return (
    <>
    <div className="groupChats">
      <div
        className="logoDesign"
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: receiveData.color,
          color: "white",
        }}
      >
        {receiveData.initial}
      </div>
      <div className="chatHeading">{receiveData.name}</div>
      
        <textarea
          className="inputText"
          type="text"
          placeholder="Enter your text here..........."
          value={content}
          onChange={handleContentChange}
          
        ></textarea>
        <img
          src={arrow}
          alt="arrow"
          className="arrow"
          onClick={handleContent}
        />
      
      
      
</div>

<div className="displayContent">
        <div className="display">
          {contentList.map((item, index) => (
            <div key={index} className="contentItem">
              {item.split('\n').map((line, lineIndex) => (
                <div className="chatContent" key={lineIndex}>
                  <div className="dateAndTime">
                    {formatDateTime(new Date())}
                  </div>
                  <div className="line">{line}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>


  );
}