import "./ViewNote.css";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewNote = () => {
  const { noteId } = useParams();
  const [theme, setTheme] = React.useState("light");
  const [note, setNote] = useState({});

  // Handle Delete Button
  const handleDelete = async () => {
    const response = await fetch(
      "http://localhost:8002/api/v1/note/deletenote/" + noteId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    window.location.href = "/";
  };

  useEffect(() => {
    getNote();
    if(localStorage.getItem("theme") === "dark"){
      setTheme("dark");
    }
    else{
      setTheme("light");
    }
  }, []);

  const getNote = async () => {
    const response = await fetch(
      "http://localhost:8002/api/v1/note/fetchonenote/" + noteId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setNote(data);
  };

  return (
    <div className={theme==="dark"?"dark":""}>
      <div className="view-note-header">
        <p className="view-note-title">View Note</p>
        <div className="button-container">
          {/* Back button */}
          <button
            className="save-button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Back
          </button>
          {/* Update Button */}
          <button
            className="save-button"
            onClick={() => {
              window.location.href = "/update-note/" + noteId;
            }}
          >
            Update
          </button>
          {/* Delete Button */}
          <button
            className="cancel-button"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#999",
          padding: "5px",
          borderRadius: "50px",
          margin: "10px",
        }}
      >
        <p className="view-note-title">Note: {note.title}</p>
      </div>

      <div className={`view-note-container ${localStorage.getItem('theme')==="dark"?"backgorund-color-grey text-color-white ":""}`}>
        <div
          className="view-note" 
          
          dangerouslySetInnerHTML={{ __html: note.content }}
        ></div>
      </div>
    </div>
  );
};

export default ViewNote;
