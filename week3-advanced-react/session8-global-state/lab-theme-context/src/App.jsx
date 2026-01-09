import React from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { UserProvider } from './contexts/UserContext'
import Layout from './components/Layout'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="app">
          <Layout />
        </div>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App