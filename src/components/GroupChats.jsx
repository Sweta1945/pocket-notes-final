import "./GroupChats.css";
import React, { useState, useEffect } from "react";
import arrow from "../assets/arrow.png";

export default function GroupChats({ selectedGroup }) {
  const [receiveData, setReceiveData] = useState({
    name: "",
    initial: "",
    color: "",
    uniqueKey: "",
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
            name: savedGroup.groupName,
            initial: savedGroup.initial,
            color: savedGroup.groupColor,
          });
          console.log("this is savedGroup", savedGroup);

          const key = `setContent_${savedGroup.groupName}`;
          const savedContent = JSON.parse(localStorage.getItem(key)) || [];
          setContentList(savedContent);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    }
  }, [selectedGroup]);

  console.log(receiveData);

  const handleContent = () => {
    if (!content) return; // Don't add empty content

    const key = `setContent_${receiveData.name}`;

    const existingContent = JSON.parse(localStorage.getItem(key)) || [];
    const newContent = {
      message: content,
      timestamp: Date.now(),
    };

    const updatedContent = [...existingContent, newContent];

    localStorage.setItem(key, JSON.stringify(updatedContent));

    setContentList(updatedContent);
    setContent("");
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    setContent(value);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents a newline character from being inserted
      handleContent();
    }
  };
  function formatDateTime(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
      date
    );

    return (
      <>
        {formattedTime} <br />
        <br /> {formattedDate}
      </>
    );
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
          onKeyUp={handleKeyUp}
        ></textarea>
        <img
          src={arrow}
          alt="arrow"
          className="arrow"
          onClick={handleContent}
        />
      </div>

      <div className="display">
        {contentList.map((item, index) => (
          <div key={index} className="contentItem">
            {typeof item === "string" ? (
              item.split("\n").map((line, lineIndex) => (
                <div className="chatContent" key={lineIndex}>
                  <div className="dateAndTime">
                    {formatDateTime(new Date())}
                  </div>
                  <div className="line">{line}</div>
                </div>
              ))
            ) : (
              <div className="chatContent" key={index}>
                <div className="dateAndTime">
                  {formatDateTime(new Date(item.timestamp))}
                </div>
                <div className="line">{item.message}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
