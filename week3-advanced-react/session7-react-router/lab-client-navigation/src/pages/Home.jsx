import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/services')
  }

  const handleLearnMore = () => {
    navigate('/about')
  }

  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">IntelleQ Academy</span>
          </h1>
          <p className="hero-subtitle">
            Master modern web development with React, JavaScript, and cutting-edge technologies. 
            Build real-world projects and advance your career.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn btn-secondary" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-elements">
            <div className="floating-card card-1">
              <span className="card-icon">⚛️</span>
              <span className="card-text">React</span>
            </div>
            <div className="floating-card card-2">
              <span className="card-icon">🛣️</span>
              <span className="card-text">Router</span>
            </div>
            <div className="floating-card card-3">
              <span className="card-icon">🎯</span>
              <span className="card-text">Hooks</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose IntelleQ?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Expert Instructors</h3>
              <p>Learn from industry professionals with years of experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Real Projects</h3>
              <p>Build portfolio-worthy projects that employers love</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Career Support</h3>
              <p>Get job placement assistance and career guidance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home