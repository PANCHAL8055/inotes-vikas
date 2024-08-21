import React, { useEffect } from "react";
import "./MainApp.css";
import { FaNoteSticky } from "react-icons/fa6";

function MainApp() {
  const [allNotes, setAllNotes] = React.useState([]);
   const [theme, setTheme] = React.useState("light");
  const getNotes = async () => {
    const response = await fetch(
      "http://localhost:8002/api/v1/note/fetchallnotes",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await response.json();
    setAllNotes(data);
  };

  React.useEffect(() => {
    getNotes();
  }, []);
  
  const toggleTheme = () => {
     setTheme(theme === "light" ? "dark" : "light");
      if (theme === "light") {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
  };
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  return (
    <div style={{paddingTop:'30px'}} className={`main-app ${theme==="dark"?"dark":""}`}>
      <div class="notes-container">
        <div class="notes-header">
          <h2 className={`notes-title ${theme==="dark"?"text-color-white":""}`} >Notes</h2>
          <div class="notes-info-box">
            <div>
              <div className={`notes-count ${theme==="dark"?"text-color-white":""}`} >Total Notes: {allNotes.length}</div>
            </div>
            <button
              class="create-note-button"
              onClick={() => {
                window.location.href = "/create-note";
              }}
            >
              Create Note
            </button>
          </div>
          <button  className={`theme-toggle-button ${theme==="dark"?"text-color-white backgorund-color-grey":""}`} onClick={toggleTheme}>
            Mode: 
            {theme === "light" ? " 🌙" : " ☀️"}
          </button>
        </div>

        <h2  className={`notes-description ${theme==="dark"?"text-color-white ":""}`}>Here you can see all your notes.</h2>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {allNotes &&
            allNotes.map((note) => (
              <div
                key={note.id}
                class="note-item "
                className={`note-item ${theme==="dark"?"text-color-white backgorund-color-grey":""}`}
                onClick={() => (window.location.href = `/view-note/${note.id}`)}
              >
                <FaNoteSticky />
                <div className={`note-title ${theme==="dark"?"text-color-white ":""}`}>{note.title}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MainApp;
