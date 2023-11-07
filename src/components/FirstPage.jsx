
import "./FirstPage.css";
import endImage from "../assets/endToend.png";
import firstPage_img from "../assets/firstPage_image.png";
import message from "../assets/message.png";
import pocketNotes from "../assets/pocketNotes.png";
import rectangle from "../assets/rectangle.png";
import lockImg from "../assets/lock.png";
import plusSign from "../assets/plusSign.png";
import createNote from "../assets/createNote.png";
import React, { useState, useEffect } from "react";
import PopupWindow from "./PopupWindow";
import GroupChats from "./GroupChats";
export default function FirstPage() {
  const [groups, setGroups] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [chat, setChat] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);

  const handleGroupChats = (groupName, initial, groupColor) => {
    setSelectedGroup({ groupName, initial, groupColor });
    localStorage.setItem("selectedGroupName", groupName);
    localStorage.setItem("selectedGroupInitial", initial);
    localStorage.setItem("selectedGroupColor", groupColor);
    setActiveGroup(groupName);
    
    setChat(true);
}

  useEffect(() => {
    if (selectedGroup !== null) {
      localStorage.setItem("selectedGroup", selectedGroup);
    }
  }, [selectedGroup]);

  const handleCreateGroup = () => {
    setShowPopup(true);
  };

  const handleCreateGroupCallback = (newGroup) => {
    setGroups([...groups, newGroup]);
    setShowPopup(false);
    localStorage.setItem("groups", JSON.stringify([...groups, newGroup]));

    
  };

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups"));
    if (storedGroups) {
      setGroups(storedGroups);
    }
  }, []);

  return (
    <div className="firstPage">
      <div className="leftSide">
        <h2 className="pocket_notes">Pocket Notes</h2>
        <div className="container" onClick={handleCreateGroup}>
          <img src={plusSign} alt="plus sign" className="plus" />
          <img src={createNote} alt="createNote" className="createNote" />
        </div>
        <div className="groups">
          {groups.map((group, index) => {
            let a = group.name.split(" ");

            let initials = "";

            if (a.length === 1) {
              initials =
                a[0].charAt(0).toUpperCase() +
                (a[0].length > 1 ? a[0].charAt(1).toUpperCase() : "");
            } else if (a.length === 2) {
              initials =
                a[0].charAt(0).toUpperCase() + a[1].charAt(0).toUpperCase();
            }

            return (
              <div
               
                className={`group ${activeGroup === group.name ? 'active' : ''}`}
                key={index}
                onClick={() =>
                  handleGroupChats(group.name, initials, group.color)
                }
              >
                <div
                  className="logo"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: group.color,
                    color: "white",
                  }}
                >
                  {initials}
                </div>
                <span className="groupN">{group.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rightSide">

        {chat ? (
          <GroupChats  />) : (
          <>
            <img
              src={firstPage_img}
              alt="firstPage image"
              className="firstPageImg"
            />
            <img src={pocketNotes} alt="pocket notes" className="pocketNotes" />
            <img src={message} alt="messages" className="message" />
            <img src={endImage} alt="endImage" className="endImage" />
            <img src={lockImg} alt="lockimage" className="lock" />
          </>
        )}
      </div>
      {/* Rendering CreateGroupPopup if showPopup is true */}
      {showPopup && (
        <PopupWindow
          onClose={() => setShowPopup(false)}
          onCreateGroup={handleCreateGroupCallback}
        />
      )}
    </div>
  );
}