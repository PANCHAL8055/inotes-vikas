import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import CreateNote from "./CreateNote";
import ViewNote from "./ViewNote";
import UpdateNote from "./UpdateNote";
import "./App.css";
import Navbar from "./Navbar";
import About from "./About";
import Protected from "./Protected";
import UnProtected from "./UnProtected";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/about" element={<About/>} />
        <Route path="/register" element={<UnProtected Component={Register} />} />
        <Route path="/login" element={<UnProtected Component={Login} />} />
        <Route path="/create-note" element={<Protected Component={CreateNote} />} />
        <Route path="/view-note/:noteId" element={<Protected Component={ViewNote} />} />
        <Route path="/update-note/:noteId" element={<Protected Component={UpdateNote} />} />
      </Routes>
    </Router>
  );
}

export default App;
