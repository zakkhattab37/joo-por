import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Zakaria</h3>
            <p>Frontend Developer specializing in React and Next.js</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home"><i className="fas fa-home"></i> Home</a></li>
              <li><a href="#about"><i className="fas fa-user"></i> About</a></li>
              <li><a href="#projects"><i className="fas fa-folder-open"></i> Projects</a></li>
              <li><a href="#contact"><i className="fas fa-envelope"></i> Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-github"></i> GitHub
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-dribbble"></i> Dribbble
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Zakaria. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
