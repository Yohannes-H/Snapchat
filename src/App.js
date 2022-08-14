import React from "react";

import "./App.css";
import WebcamCapture from "./WebcamCapture";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preview from "./Preview";
import Chats from "./Chats";
import ChatView from "./ChatView";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./Login";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            username: user.displayName,
            profilePic: user.photoURL,
            id: user.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className="app__logo"
              src="https://images.ctfassets.net/adclj4ijug4e/5LO0pW3N2SNIQTN3DPr9zZ/ef2d3f804ec3719a3ac0d43ab3732546/social-lg.jpeg"
              alt=""
            />
            <div className="app__body">
              <div className="app__bodyBackground">
                <Routes>
                  <Route path="/" element={<WebcamCapture />} />
                  <Route path="/chats/view" element={<ChatView />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/preview" element={<Preview />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
