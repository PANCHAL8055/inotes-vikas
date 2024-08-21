import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const handlelogout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/';
    }   
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">iNotes</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links">About</Link>
          </li>
          {
            localStorage.getItem('accessToken') ? (
              <>
          <li className="nav-item">
            <button onClick={handlelogout}className="logout-button">Logout</button>
          </li>
              </>
            ) : ""
          }
        </ul>
      </div>
    </nav>
  );
}
