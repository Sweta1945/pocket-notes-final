import React, { useState } from "react";
import "./PopupWindow.css";
export default function PopupWindow({ onClose, onCreateGroup }) {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [clickedColors, setClickedColors] = useState({});

  const handleCreateGroup = () => {
    if (groupName && selectedColor) {
      const newGroup = {
        name: groupName,
        color: selectedColor,
      };
    
      onCreateGroup(newGroup);
      onClose();
    }
  };
  const handleClick = (color) => {
    setSelectedColor(color);
    setClickedColors((prevClickedColors) => ({
      ...prevClickedColors,
      [color]: true,
    }));
  };
  return (
    <div className="popup-container">
      <div className="popup">
        <div className="cross" onClick={onClose}>
          ❌
        </div>
        <h2>Create New Notes Group</h2>
        <label className="groupName">
          Group Name
          <input
            type="text"
            className="popupInput"
            placeholder="Enter your group name...."
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </label>

        <div className="selectColors">
          Choose color
          <div className="color-options">
          <div
        className="color-option"
        style={{
          backgroundColor: "#B38BFA",
          border: clickedColors["#B38BFA"] ? "2px solid black" : "none",
        }}
        onClick={() => handleClick("#B38BFA")}
      ></div>
         

         <div
        className="color-option"
        style={{
          backgroundColor:  "#FF79F2",
          border: clickedColors[ "#FF79F2"] ? "2px solid black" : "none",
        }}
        onClick={() => handleClick( "#FF79F2")}
      ></div>
         
         <div
        className="color-option"
        style={{
          backgroundColor:  "#43E6FC",
          border: clickedColors[ "#43E6FC"] ? "2px solid black" : "none",
        }}
        onClick={() => handleClick( "#43E6FC")}
      ></div>
            

            <div
        className="color-option"
        style={{
          backgroundColor:  "#F19576",
          border: clickedColors[ "#F19576"] ? "2px solid black" : "none",
        }}
        onClick={() => handleClick( "#F19576")}
      ></div>





<div
        className="color-option"
        style={{
          backgroundColor:  "#0047FF",
          border: clickedColors[ "#0047FF"] ? "2px solid black" : "none",
        }}
        onClick={() => handleClick( "#0047FF")}
      ></div>



<div
        className="color-option"
        style={{
          backgroundColor: " #6691FF",
          border: clickedColors[" #6691FF"] ? "2px solid black" : "none",
        }}
        onClick={() => handleClick( " #6691FF")}
      ></div>



          </div>
        </div>

        <button onClick={handleCreateGroup} className="create">
          Create
        </button>
      </div>
    </div>
  );
}
