import React, { useState } from 'react'
import DynamicCard from './components/DynamicCard'
import './App.css'

function App() {
  const [cardData, setCardData] = useState({
    title: 'Dynamic Card Component',
    content: 'This card adapts to different data types and layouts',
    type: 'info',
    showActions: true
  })

  const cardTypes = [
    {
      type: 'info',
      title: 'Information Card',
      content: 'This is an informational card with helpful details.',
      icon: 'ℹ️'
    },
    {
      type: 'success',
      title: 'Success Message',
      content: 'Your action was completed successfully!',
      icon: '✅'
    },
    {
      type: 'warning',
      title: 'Warning Alert',
      content: 'Please review this important information.',
      icon: '⚠️'
    },
    {
      type: 'error',
      title: 'Error Notification',
      content: 'Something went wrong. Please try again.',
      icon: '❌'
    },
    {
      type: 'profile',
      title: 'John Doe',
      content: 'Full Stack Developer with 5+ years experience',
      icon: '👤',
      extra: {
        email: 'john@example.com',
        location: 'Mumbai, India'
      }
    }
  ]

  const handleCardTypeChange = (type) => {
    const selectedCard = cardTypes.find(card => card.type === type)
    setCardData({
      ...selectedCard,
      showActions: true
    })
  }

  const handleAction = (action) => {
    alert(`${action} button clicked!`)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎴 Dynamic Card Component</h1>
        <p>Session 4 Task: Conditional Rendering & Props</p>
      </header>

      <div className="controls">
        <h3>Card Type:</h3>
        <div className="type-buttons">
          {cardTypes.map(card => (
            <button
              key={card.type}
              className={`type-btn ${cardData.type === card.type ? 'active' : ''}`}
              onClick={() => handleCardTypeChange(card.type)}
            >
              {card.icon} {card.type}
            </button>
          ))}
        </div>
      </div>

      <div className="card-showcase">
        <DynamicCard
          {...cardData}
          onAction={handleAction}
        />
      </div>

      <div className="code-preview">
        <h3>Current Props:</h3>
        <pre>{JSON.stringify(cardData, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App