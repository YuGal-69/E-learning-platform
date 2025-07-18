import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="main-footer htb-footer">
    <div className="footer-container">
      <div className="footer-brand">
        <img src="/logo.png" alt="CyberNinja Logo" className="footer-logo neon-glow" />
        <div>
          <span className="footer-title htb-accent">CyberNinja</span>
          <p className="footer-desc">
            Empowering the next generation of cybersecurity professionals with hands-on labs, real-world challenges, and expert guidance.
          </p>
        </div>
      </div>
      <nav className="footer-nav" aria-label="Quick Links">
        <a href="/" aria-label="Home">Home</a>
        <a href="/learning-paths" aria-label="Learning Paths">Learning Paths</a>
        <a href="/practice-lab" aria-label="Practice Lab">Practice Lab</a>
        <a href="/challenges" aria-label="Challenges">Challenges</a>
        <a href="/profile" aria-label="Profile">Profile</a>
      </nav>
      <div className="footer-info">
        <div className="footer-section">
          <h4>About</h4>
          <p>CyberNinja is a platform dedicated to practical cybersecurity education, offering interactive labs, career paths, and a vibrant community.</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: <a href="mailto:support@cyberninja.com">support@cyberninja.com</a></p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
      <div className="footer-social">
        <a href="https://github.com/YuGal-69" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa fa-github"></i></a>
        <a href="mailto:support@cyberninja.com" aria-label="Email"><i className="fa fa-envelope"></i></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa fa-linkedin"></i></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fa fa-twitter"></i></a>
      </div>
    </div>
    <div className="footer-bottom">
      <span>
        &copy; {new Date().getFullYear()} CyberNinja. All rights reserved.
      </span>
    </div>
  </footer>
);

export default Footer; 