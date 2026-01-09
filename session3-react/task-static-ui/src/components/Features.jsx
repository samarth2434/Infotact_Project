import React from 'react'
import FeatureCard from './FeatureCard'

const Features = () => {
  const features = [
    {
      id: 1,
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Built with Vite for instant hot module replacement and blazing fast builds.'
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Component Based',
      description: 'Build encapsulated components that manage their own state and compose them.'
    },
    {
      id: 3,
      icon: '🔄',
      title: 'Virtual DOM',
      description: 'React efficiently updates and renders components using the Virtual DOM.'
    },
    {
      id: 4,
      icon: '🛠️',
      title: 'Modern Tooling',
      description: 'Use the latest ES6+ features with full TypeScript support out of the box.'
    },
    {
      id: 5,
      icon: '📱',
      title: 'Responsive Design',
      description: 'Create beautiful, responsive UIs that work seamlessly across all devices.'
    },
    {
      id: 6,
      icon: '🚀',
      title: 'Production Ready',
      description: 'Optimized builds with code splitting and lazy loading for best performance.'
    }
  ]

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose React?</h2>
          <p className="section-subtitle">
            Discover the powerful features that make React the most popular UI library
          </p>
        </div>
        <div className="features-grid">
          {features.map(feature => (
            <FeatureCard 
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
