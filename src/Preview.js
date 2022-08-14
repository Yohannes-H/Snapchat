import React from "react";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import "./Preview.css";
import { useNavigate } from "react-router-dom";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CreateIcon from "@mui/icons-material/Create";
import NoteIcon from "@mui/icons-material/Note";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CropIcon from "@mui/icons-material/Crop";
import TimerIcon from "@mui/icons-material/Timer";
import SendIcon from "@mui/icons-material/Send";
import { v4 as uuid } from "uuid";
import { db, storage } from "./firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { selectUser } from "./features/appSlice";

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  React.useEffect(() => {
    if (!cameraImage) {
      navigate("/", { replace: true });
    }
  }, [cameraImage]);

  const sendPost = () => {
    const id = uuid();
    const storageRef = ref(storage, `posts/${id}`);

    uploadString(storageRef, cameraImage, "data_url").then((snapshot) => {
      console.log("Uploaded a data_url string!");
      getDownloadURL(storageRef)
        .then((url) => {
          console.log("download URL", url);
          addDoc(collection(db, "posts"), {
            imageUrl: url,
            username: user.username,
            read: false,
            profilePic: user.profilePic,
            timestamp: serverTimestamp(),
          }).then((d) => {
            console.log("Document written with ID: ", d.id);
            navigate("/chats");
          });
        })
        .catch((error) => {
          // Handle any errors
        });
    });
  };
  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preview__close" />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon fontSize="small" className="preview__sendIcon" />
      </div>
    </div>
  );
}

export default Preview;
