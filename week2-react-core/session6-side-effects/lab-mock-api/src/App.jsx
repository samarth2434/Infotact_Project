import React, { useState, useEffect } from 'react'
import UserList from './components/UserList'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import './App.css'

// Mock API service
const mockAPI = {
  users: [
    { id: 1, name: 'Arjun Sharma', email: 'arjun@example.com', role: 'Developer', status: 'active' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', role: 'Designer', status: 'active' },
    { id: 3, name: 'Rahul Kumar', email: 'rahul@example.com', role: 'Manager', status: 'inactive' },
    { id: 4, name: 'Sneha Singh', email: 'sneha@example.com', role: 'Developer', status: 'active' },
    { id: 5, name: 'Vikram Gupta', email: 'vikram@example.com', role: 'Analyst', status: 'active' }
  ],

  fetchUsers: (delay = 1500) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          resolve([...mockAPI.users])
        } else {
          reject(new Error('Failed to fetch users from server'))
        }
      }, delay)
    })
  },

  updateUser: (userId, updates) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockAPI.users.findIndex(u => u.id === userId)
        if (userIndex !== -1) {
          mockAPI.users[userIndex] = { ...mockAPI.users[userIndex], ...updates }
          resolve(mockAPI.users[userIndex])
        } else {
          reject(new Error('User not found'))
        }
      }, 800)
    })
  },

  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockAPI.users.findIndex(u => u.id === userId)
        if (userIndex !== -1) {
          mockAPI.users.splice(userIndex, 1)
          resolve({ success: true })
        } else {
          reject(new Error('User not found'))
        }
      }, 600)
    })
  }
}

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshCount, setRefreshCount] = useState(0)

  // Fetch users on component mount and when refreshCount changes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)
        const userData = await mockAPI.fetchUsers()
        setUsers(userData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [refreshCount])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCount(prev => prev + 1)
    }, 30000)

    return () => clearInterval(interval) // Cleanup
  }, [])

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1)
  }

  const handleUpdateUser = async (userId, updates) => {
    try {
      const updatedUser = await mockAPI.updateUser(userId, updates)
      setUsers(prev => prev.map(user => 
        user.id === userId ? updatedUser : user
      ))
    } catch (err) {
      alert(`Error updating user: ${err.message}`)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }

    try {
      await mockAPI.deleteUser(userId)
      setUsers(prev => prev.filter(user => user.id !== userId))
    } catch (err) {
      alert(`Error deleting user: ${err.message}`)
    }
  }

  if (loading) {
    return (
      <div className="app">
        <LoadingSpinner message="Fetching users from API..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <ErrorMessage 
          message={error} 
          onRetry={handleRefresh}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔌 Mock API Integration Lab</h1>
        <p>Session 6: useEffect & API Connections</p>
        <div className="header-actions">
          <button className="refresh-btn" onClick={handleRefresh}>
            🔄 Refresh Data
          </button>
          <span className="refresh-info">
            Auto-refresh: {refreshCount} times
          </span>
        </div>
      </header>

      <UserList 
        users={users}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  )
}

export default App