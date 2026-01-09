import React from 'react'

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Build Amazing Apps with <span className="gradient-text">React</span>
          </h1>
          <p className="hero-subtitle">
            Learn modern JavaScript and React fundamentals with IntelleQ Academy. 
            Transform your career with hands-on projects and expert guidance.
          </p>
          <div className="hero-buttons">
            <button className="primary-button" onClick={() => scrollToSection('contact')}>Start Learning</button>
            <button className="secondary-button" onClick={() => scrollToSection('features')}>View Demo</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card card-1">
            <span className="card-icon">⚛️</span>
            <span className="card-text">React</span>
          </div>
          <div className="floating-card card-2">
            <span className="card-icon">📦</span>
            <span className="card-text">Vite</span>
          </div>
          <div className="floating-card card-3">
            <span className="card-icon">🎨</span>
            <span className="card-text">JSX</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
