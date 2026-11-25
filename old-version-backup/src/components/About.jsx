import React from 'react';
import './About.css';
import profileImage from '../assets/image.png';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-image">
            <div className="image-container glass-card">
              <img src={profileImage} alt="Zakaria - Frontend Developer" className="profile-image" />
            </div>
          </div>
          
          <div className="about-text">
            <p className="about-intro">
              As a dedicated Frontend Developer, I specialize in creating high-performance, 
              scalable web applications using React and Next.js. My expertise encompasses modern 
              JavaScript frameworks, responsive design principles, and best practices in web development. 
              I am committed to delivering exceptional user experiences through clean, maintainable code 
              and attention to detail.
            </p>
            
            <div className="stats-grid">
              <div className="stat-card glass-card">
                <h3 className="stat-number">5+</h3>
                <p className="stat-label">Years Experience</p>
              </div>
              <div className="stat-card glass-card">
                <h3 className="stat-number">50+</h3>
                <p className="stat-label">Projects Completed</p>
              </div>
              <div className="stat-card glass-card">
                <h3 className="stat-number">30+</h3>
                <p className="stat-label">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
