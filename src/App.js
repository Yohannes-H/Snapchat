import React from "react";

import "./App.css";
import WebcamCapture from "./WebcamCapture";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preview from "./Preview";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="app__body">
          <Routes>
            <Route path="/" element={<WebcamCapture />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
