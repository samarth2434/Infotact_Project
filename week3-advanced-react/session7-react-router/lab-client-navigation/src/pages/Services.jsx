import React from 'react'

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Full Stack Development',
      description: 'Master both frontend and backend development with modern technologies',
      features: ['React & Node.js', 'Database Design', 'API Development', 'Deployment'],
      price: '$299',
      duration: '12 weeks'
    },
    {
      id: 2,
      title: 'React Specialization',
      description: 'Deep dive into React ecosystem with advanced patterns and best practices',
      features: ['React Hooks', 'State Management', 'Performance Optimization', 'Testing'],
      price: '$199',
      duration: '8 weeks'
    },
    {
      id: 3,
      title: 'JavaScript Mastery',
      description: 'From basics to advanced JavaScript concepts and modern ES6+ features',
      features: ['ES6+ Features', 'Async Programming', 'DOM Manipulation', 'Module Systems'],
      price: '$149',
      duration: '6 weeks'
    }
  ]

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Our Services</h1>
          <p>Choose the perfect course for your learning journey</p>
        </div>
        
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-header">
                <h3>{service.title}</h3>
                <div className="service-price">{service.price}</div>
              </div>
              
              <p className="service-description">{service.description}</p>
              
              <div className="service-features">
                <h4>What you'll learn:</h4>
                <ul>
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="service-footer">
                <span className="duration">Duration: {service.duration}</span>
                <button className="btn btn-primary">Enroll Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services