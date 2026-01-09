import React from 'react'

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About IntelleQ Academy</h2>
            <p className="about-description">
              We are dedicated to transforming aspiring developers into industry-ready professionals. 
              Our comprehensive curriculum covers modern JavaScript, React, and full-stack development.
            </p>
            <p className="about-description">
              With hands-on projects, real-world applications, and expert mentorship, we ensure 
              that every student gains practical experience and confidence to excel in their career.
            </p>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-number">500+</div>
                <div className="stat-label">Students Trained</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">95%</div>
                <div className="stat-label">Placement Rate</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">4.8/5</div>
                <div className="stat-label">Student Rating</div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <span className="placeholder-icon">👨‍💻</span>
              <p>Learning & Growing Together</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
