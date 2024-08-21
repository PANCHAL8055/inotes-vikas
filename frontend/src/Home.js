import React from "react";
import MainApp from "./MainApp";
import { Link } from "react-router-dom";
import './Home.css'; 

function Home() {
  const accessToken = localStorage.getItem("accessToken");

  return (
    <div >
      {accessToken ? (
        <MainApp />
      ) : (
        <div className="App">
        <header className="App-header">
          <h1>Welcome to iNotes</h1>
          <p>Taking Notes Made Easy</p>
          <div className="button-container">
            <Link className="App-button" to="/register">
              Register
            </Link>
            <Link className="App-button" to="/login">
              Login
            </Link>
          </div>
        </header>
      </div>
      )}
    </div>
  );
}

export default Home;
