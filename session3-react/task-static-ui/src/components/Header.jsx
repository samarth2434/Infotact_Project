import React from 'react'

const Header = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">IntelleQ</span>
        </div>
        <nav className="nav">
          <a href="#home" className="nav-link" onClick={(e) => scrollToSection(e, 'home')}>Home</a>
          <a href="#features" className="nav-link" onClick={(e) => scrollToSection(e, 'features')}>Features</a>
          <a href="#about" className="nav-link" onClick={(e) => scrollToSection(e, 'about')}>About</a>
          <a href="#contact" className="nav-link" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
        </nav>
        <button className="cta-button" onClick={(e) => scrollToSection(e, 'contact')}>Get Started</button>
      </div>
    </header>
  )
}

export default Header
