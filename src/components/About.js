import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function About(props) {
  const {setProgress} = props;
  useEffect(() => {
    setProgress(100); // Use setProgress here
  }, []);

  return (
    <div>
      <div className="container my-3" style={{ maxWidth: "800px", backgroundColor: "#feb941", borderRadius: "2rem", margin: "0 auto", padding: "30px", width:"400px" }}>
        <h1>About CloudBook</h1>
        <p>Welcome to CloudBook, your open-source notes storage solution!</p>

        <h2>What is CloudBook?</h2>
        <p>CloudBook is a web application designed to help you store and organize your notes in the cloud. It provides a simple and intuitive interface for creating, editing, and managing your notes from anywhere, at any time.</p>

        <h2>Key Features</h2>
        <ul style={{ marginBottom: "20px" }}>
          <li style={{ marginBottom: "10px" }}>Secure cloud storage for your notes</li>
          <li style={{ marginBottom: "10px" }}>User-friendly interface</li>
          <li style={{ marginBottom: "10px" }}>Create, edit, and delete notes</li>
          <li style={{ marginBottom: "10px" }}>Tagging system for organizing notes</li>
          <li style={{ marginBottom: "10px" }}>Responsive design for use on any device</li>
        </ul>

        <h2>How to Use</h2>
        <p>To start using CloudBook, simply sign up for an account or log in if you already have one. Once logged in, you can begin creating and managing your notes right away.</p>

        <h2>Get Involved</h2>
        <p>CloudBook is an open-source project, and we welcome contributions from the community. If you're interested in helping to improve CloudBook, check out our <Link to="https://github.com/cloudbook" rel="noreferrer" target="_blank">GitHub repository</Link> and get involved!</p>

        <h2>Contact Us</h2>
        <p>If you have any questions, feedback, or suggestions, feel free to contact us at <Link to="mailto:contact@cloudbook.com">contact@cloudbook.com</Link>.</p>

        <p>Follow us on social media:</p>
        <ul style={{ marginBottom: "20px" }}>
          <li style={{ marginBottom: "10px" }}><Link to="https://github.com/Parashar365D/CloudBook" target="_blank">Github</Link></li>
          <li style={{ marginBottom: "10px" }}><Link to="www.linkedin.com/in/chetan-parashar-374a64243" target="_blank">Linkdin</Link></li>
          <li style={{ marginBottom: "10px" }}><Link to="https://www.instagram.com/ichetan_365d/" target="_blank">Instagram</Link></li>
        </ul>
      </div>
    </div>
  );
}
