import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/useTheme';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'certifications', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <span className="logo-text">Zakaria</span>
          <p className="logo-subtitle">Frontend Developer</p>
        </div>
        
        <ul className="nav-links">
          <li>
            <a href="#home" className={activeSection === 'home' ? 'active' : ''}>
              <i className="fas fa-home"></i>
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>
              <i className="fas fa-user"></i>
              <span>About</span>
            </a>
          </li>
          <li>
            <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>
              <i className="fas fa-code"></i>
              <span>Skills</span>
            </a>
          </li>
          <li>
            <a href="#certifications" className={activeSection === 'certifications' ? 'active' : ''}>
              <i className="fas fa-certificate"></i>
              <span>Certs</span>
            </a>
          </li>
          <li>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>
              <i className="fas fa-folder-open"></i>
              <span>Projects</span>
            </a>
          </li>
          <li>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>
              <i className="fas fa-envelope"></i>
              <span>Contact</span>
            </a>
          </li>
        </ul>

        <div className="nav-divider" aria-hidden="true"></div>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
        </button>
        
        <div className="nav-footer">
          <a href="#contact" className="btn btn-primary nav-cta">
            <i className="fas fa-paper-plane"></i> Hire Me
          </a>
          
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="fab fa-github"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-dribbble"></i></a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
