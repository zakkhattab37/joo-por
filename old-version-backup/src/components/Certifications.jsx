import React from 'react';
import './Certifications.css';

const Certifications = () => {
  const certifications = [
    {
      title: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta',
      date: 'Jan 2024',
      icon: 'fab fa-meta',
      color: '#0668E1',
      credentialUrl: '#',
      skills: ['React', 'JavaScript', 'UX/UI', 'Version Control'],
    },
    {
      title: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      date: 'Mar 2023',
      icon: 'fab fa-free-code-camp',
      color: '#0A0A23',
      credentialUrl: '#',
      skills: ['JavaScript', 'ES6', 'Algorithms', 'OOP'],
    },
    {
      title: 'Responsive Web Design Certification',
      issuer: 'freeCodeCamp',
      date: 'Dec 2022',
      icon: 'fab fa-free-code-camp',
      color: '#0A0A23',
      credentialUrl: '#',
      skills: ['HTML5', 'CSS3', 'Flexbox', 'Accessibility'],
    },
    {
      title: 'React — The Complete Guide',
      issuer: 'Udemy',
      date: 'Jun 2023',
      icon: 'fas fa-graduation-cap',
      color: '#A435F0',
      credentialUrl: '#',
      skills: ['React', 'Redux', 'Next.js', 'React Router'],
    },
  ];

  return (
    <section id="certifications" className="certifications section">
      <div className="container">
        <h2 className="section-title">Certifications</h2>

        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-card glass-card">
              <div className="cert-icon-wrapper" style={{ background: cert.color }}>
                <i className={cert.icon}></i>
              </div>

              <div className="cert-body">
                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-dot" aria-hidden="true">·</span>
                  <span className="cert-date">{cert.date}</span>
                </div>

                <div className="cert-skills">
                  {cert.skills.map((skill, idx) => (
                    <span key={idx} className="cert-skill-tag">{skill}</span>
                  ))}
                </div>

                <a
                  href={cert.credentialUrl}
                  className="cert-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-external-link-alt"></i> View Credential
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

