import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className={`about-container ${localStorage.getItem('theme')==="dark"?"about-container-dark  ":""}`}>
      <div className={`about-content ${localStorage.getItem('theme')==="dark"?"about-content-dark ":""}`}>
        <h1>About iNotes</h1>
        <p>
          Welcome to iNotes, a simple and efficient note-taking app created using the MERN stack. Our goal is to provide you with a seamless experience for managing your notes.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Create, view, and update notes</li>
          <li>User authentication for secure access</li>
          <li>Responsive design for all devices</li>
          <li>Easy-to-use interface</li>
        </ul>
        <h2>Technologies Used</h2>
        <p>
          iNotes is built using the following technologies:
        </p>
        <ul>
          <li><strong>MySql</strong> - For database management</li>
          <li><strong>Express</strong> - For backend server</li>
          <li><strong>React</strong> - For frontend user interface</li>
          <li><strong>Node.js</strong> - For server-side runtime</li>
        </ul>
      </div>
    </div>
  );
}
