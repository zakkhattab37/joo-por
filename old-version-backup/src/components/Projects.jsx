import React from 'react';
import './Projects.css';
import { TopographyBackground } from './ui/topography-background';
import { useTheme } from '../context/useTheme';

const Projects = () => {
  const { theme } = useTheme();
  const projects = [
    {
      title: 'Next.js E-Commerce Platform',
      description: 'A modern e-commerce application built with Next.js 14, featuring server-side rendering, dynamic routing, and optimized performance with App Router.',
      tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: 'fas fa-shopping-cart'
    },
    {
      title: 'React Dashboard Application',
      description: 'Comprehensive admin dashboard with real-time data visualization, built using React, Redux for state management, and Bootstrap for responsive UI components.',
      tags: ['React', 'Redux', 'Bootstrap', 'Chart.js'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: 'fas fa-chart-line'
    },
    {
      title: 'Responsive Portfolio Website',
      description: 'Modern, fully responsive portfolio website showcasing advanced CSS techniques, smooth animations, and mobile-first design principles.',
      tags: ['React', 'CSS3', 'Sass', 'Framer Motion'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: 'fas fa-laptop-code'
    }
  ];

  return (
    <section id="projects" className="projects section relative">
      <TopographyBackground
        style={{ zIndex: -100 }}
        backgroundColor={theme === 'light' ? '#f1f5f9' : '#0a0a0f'}
        lineColor={theme === 'light' ? 'rgba(100, 116, 139, 0.35)' : 'rgba(120, 120, 120, 1)'}
      />
      <div className="container relative z-10">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card glass-card">
              <div 
                className="project-header" 
                style={{ background: project.gradient }}
              >
                <div className="project-icon">
                  <i className={project.icon}></i>
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="project-tag">{tag}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  <button className="btn-link">
                    <i className="fas fa-external-link-alt"></i> View Demo
                  </button>
                  <button className="btn-link">
                    <i className="fab fa-github"></i> Source Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
