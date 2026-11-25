import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I am available for freelance projects and full-time opportunities. 
              If you have a project in mind or would like to discuss potential collaboration, 
              please feel free to reach out.
            </p>
            
            <div className="contact-methods">
              <div className="contact-method glass-card">
                <div className="method-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="method-details">
                  <h4>Email</h4>
                  <a href="mailto:zakkhattab37@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>zakkhattab37@gmail.com</a>
                </div>
              </div>
              
              <div className="contact-method glass-card">
                <div className="method-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="method-details">
                  <h4>Phone</h4>
                  <a href="tel:+201027315917" style={{ color: 'inherit', textDecoration: 'none' }}>+20 1027315917</a>
                </div>
              </div>
              
              <div className="contact-method glass-card">
                <div className="method-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="method-details">
                  <h4>Location</h4>
                  <p>Your City, Country</p>
                </div>
              </div>
            </div>
          </div>
          
          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-with-icon">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="input-with-icon">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="input-with-icon">
                <i className="fas fa-comment-dots"></i>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary submit-btn">
              <i className="fas fa-paper-plane"></i> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
