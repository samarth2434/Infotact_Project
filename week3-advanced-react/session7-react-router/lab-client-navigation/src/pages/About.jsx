import React from 'react'

const About = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>About IntelleQ Academy</h1>
          <p>Empowering developers with cutting-edge skills</p>
        </div>
        
        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              At IntelleQ Academy, we're dedicated to transforming aspiring developers into 
              industry-ready professionals. Our comprehensive curriculum covers modern JavaScript, 
              React, and full-stack development with hands-on projects and real-world applications.
            </p>
          </section>
          
          <section className="about-section">
            <h2>What We Offer</h2>
            <div className="offerings-grid">
              <div className="offering-card">
                <h3>🎓 Expert Training</h3>
                <p>Learn from industry professionals with years of experience</p>
              </div>
              <div className="offering-card">
                <h3>💼 Real Projects</h3>
                <p>Build portfolio-worthy projects that employers love</p>
              </div>
              <div className="offering-card">
                <h3>🚀 Career Support</h3>
                <p>Get job placement assistance and career guidance</p>
              </div>
              <div className="offering-card">
                <h3>🌟 Modern Tech Stack</h3>
                <p>Master the latest technologies and frameworks</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About