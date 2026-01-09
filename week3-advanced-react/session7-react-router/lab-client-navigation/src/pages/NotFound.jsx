import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="page">
      <div className="container">
        <div className="not-found">
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={handleGoHome}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound