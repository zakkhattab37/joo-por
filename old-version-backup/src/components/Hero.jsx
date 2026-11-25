import React from 'react';
import './Hero.css';
import profileImage from '../assets/image.jpg';
import cvFile from '../assets/cv.pdf';
import { TypewriterEffect } from './ui/typewriter-effect';

const Hero = () => {
  return (
    <section id="home" className="hero section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text animate-fadeInUp">
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-title">Zakaria <span style={{ color: 'var(--blue-secondary)' }}>khattab</span></h1>
            <h2 className="hero-subtitle" style={{ minHeight: '1.2em' }}>
              <TypewriterEffect 
                text="Frontend Developer | React & Next.js Specialist" 
                speed={100} 
                delay={4000}
              />
            </h2>
            <p className="hero-description">
              I specialize in building modern, responsive web applications using React and Next.js. 
              With a focus on performance, accessibility, and user experience, I deliver high-quality 
              frontend solutions that drive business results.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary">
                <i className="fas fa-briefcase"></i> View My Work
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-envelope"></i> Contact Me
              </button>
              <a
                href={cvFile}
                download="Zakaria_Khattab_CV.pdf"
                className="btn btn-download"
              >
                <i className="fas fa-download"></i> Download CV
              </a>
            </div>
          </div>
          
          <div className="hero-visual animate-fadeIn">
            <div className="hero-image-container">
              <img src={profileImage} alt="Zakaria - Frontend Developer" className="hero-profile-image" />
              
              <div className="tech-orbit">
                <div className="tech-item item-1">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                </div>
                <div className="tech-item item-2">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="nextjs-icon" />
                </div>
                <div className="tech-item item-3">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
                </div>
                <div className="tech-item item-4">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" />
                </div>
                <div className="tech-item item-5">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
