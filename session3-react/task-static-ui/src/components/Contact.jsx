import React from 'react'

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have questions? We'd love to hear from you. Send us a message!
          </p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3 className="info-title">Email</h3>
              <p className="info-text">contact@intelleqacademy.com</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📱</div>
              <h3 className="info-title">Phone</h3>
              <p className="info-text">+91 98765 43210</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3 className="info-title">Location</h3>
              <p className="info-text">Mumbai, Maharashtra, India</p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">⏰</div>
              <h3 className="info-title">Working Hours</h3>
              <p className="info-text">Mon - Fri: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
          
          <div className="contact-form">
            <form>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Enter your name"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  placeholder="What's this about?"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  rows="5"
                  placeholder="Your message here..."
                  className="form-input"
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
