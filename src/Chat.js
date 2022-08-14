import { Avatar } from "@mui/material";
import React from "react";
import "./Chat.css";
import StopIcon from "@mui/icons-material/Stop";
import ReactTimeago from "react-timeago";
import { selectImage } from "./features/appSlice";
import { useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";
function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = async () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
    }
    await updateDocs();
    navigate("/chats/view");
  };

  const updateDocs = async () => {
    await updateDoc(doc(db, "posts", id), {
      read: true,
    });
  };
  return (
    <div onClick={open} className="chat">
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>

      {!read && <StopIcon className="chat__readIcon" />}
    </div>
  );
}

export default Chat;
