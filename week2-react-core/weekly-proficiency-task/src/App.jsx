import React, { useState, useEffect } from 'react'
import UserProfile from './components/UserProfile'
import ContactForm from './components/ContactForm'
import DataWidget from './components/DataWidget'
import { useDataFetch } from './hooks/useDataFetch'
import './App.css'

function App() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [formSubmissions, setFormSubmissions] = useState([])
  
  // Using custom hook for data fetching
  const { data: users, loading, error, refetch } = useDataFetch(
    'https://jsonplaceholder.typicode.com/users'
  )

  // Handle form submission
  const handleFormSubmit = (formData) => {
    const submission = {
      id: Date.now(),
      ...formData,
      timestamp: new Date().toISOString()
    }
    setFormSubmissions(prev => [submission, ...prev])
  }

  // Handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 Week 2 Proficiency Task</h1>
        <p>React Core: Components, State & Side Effects</p>
      </header>

      <div className="app-grid">
        {/* Left Column: User Profiles */}
        <div className="column">
          <h2>👥 User Profiles</h2>
          {loading && <div className="loading">Loading users...</div>}
          {error && (
            <div className="error">
              Error: {error}
              <button onClick={refetch}>Retry</button>
            </div>
          )}
          {users && (
            <div className="user-profiles">
              {users.slice(0, 3).map(user => (
                <UserProfile
                  key={user.id}
                  user={user}
                  isSelected={selectedUser?.id === user.id}
                  onSelect={handleUserSelect}
                />
              ))}
            </div>
          )}
        </div>

        {/* Middle Column: Contact Form */}
        <div className="column">
          <h2>📝 Contact Form</h2>
          <ContactForm 
            onSubmit={handleFormSubmit}
            selectedUser={selectedUser}
          />
          
          {formSubmissions.length > 0 && (
            <div className="submissions">
              <h3>Recent Submissions ({formSubmissions.length})</h3>
              {formSubmissions.slice(0, 3).map(submission => (
                <div key={submission.id} className="submission-item">
                  <strong>{submission.name}</strong> - {submission.subject}
                  <small>{new Date(submission.timestamp).toLocaleString()}</small>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Live Data Widget */}
        <div className="column">
          <h2>📊 Live Data Widget</h2>
          <DataWidget />
        </div>
      </div>
    </div>
  )
}

export default App