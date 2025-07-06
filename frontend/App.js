import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import DocumentProfile from "./components/DocumentProfile";
// import DocumentList from "./components/DocumentList";
// import OCRUploader from "./components/OCRUploader";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/documents" element={<DocumentProfile />} />
        {/* <Route path="/documents" element={<DocumentList />} /> */}

        {/* <Route path="/scan" element={<OCRUploader />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
