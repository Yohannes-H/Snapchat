import { Avatar } from "@mui/material";
import React from "react";
import "./Chats.css";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { auth, db } from "./firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { resetImage, selectUser } from "./features/appSlice";
import { signOut } from "firebase/auth";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "./features/cameraSlice";
function Chats() {
  const [posts, setPosts] = React.useState([]);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "asc"));

    const POSTS = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((doc) => {
        if (doc.type === "added" || doc.type === "modified") {
          //  POSTS.push(doc.doc.data());
          POSTS.push({
            id: doc.doc.id,
            data: doc.doc.data(),
          });
        }
      });
      console.log("Current POSTS in CA: ", POSTS);
      setPosts(POSTS);
    });
    return unsubscribe;
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user?.profilePic}
          onClick={async () => {
            await signOut(auth);
          }}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts?.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => {
            return (
              <Chat
                key={id}
                id={id}
                username={username}
                timestamp={timestamp}
                imageUrl={imageUrl}
                read={read}
                profilePic={profilePic}
              />
            );
          }
        )}
      </div>
      <RadioButtonUnchecked
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
