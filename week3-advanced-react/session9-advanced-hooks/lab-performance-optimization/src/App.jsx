import React, { useState, useMemo, useCallback } from 'react'
import UserList from './components/UserList'
import SearchBar from './components/SearchBar'
import FilterControls from './components/FilterControls'
import { generateMockUsers } from './utils/mockData'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterBy, setFilterBy] = useState('all')
  const [users] = useState(() => generateMockUsers(1000)) // Generate 1000 users

  // Memoized filtered and sorted users
  const filteredAndSortedUsers = useMemo(() => {
    console.log('🔄 Recalculating filtered users...')
    
    let filtered = users

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by department
    if (filterBy !== 'all') {
      filtered = filtered.filter(user => user.department === filterBy)
    }

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'email':
          return a.email.localeCompare(b.email)
        case 'department':
          return a.department.localeCompare(b.department)
        case 'salary':
          return b.salary - a.salary
        case 'joinDate':
          return new Date(b.joinDate) - new Date(a.joinDate)
        default:
          return 0
      }
    })

    return filtered
  }, [users, searchTerm, sortBy, filterBy])

  // Memoized callback functions
  const handleSearch = useCallback((term) => {
    setSearchTerm(term)
  }, [])

  const handleSortChange = useCallback((sort) => {
    setSortBy(sort)
  }, [])

  const handleFilterChange = useCallback((filter) => {
    setFilterBy(filter)
  }, [])

  // Performance stats
  const stats = useMemo(() => ({
    total: users.length,
    filtered: filteredAndSortedUsers.length,
    departments: [...new Set(users.map(u => u.department))].length
  }), [users, filteredAndSortedUsers])

  return (
    <div className="app">
      <header className="app-header">
        <h1>⚡ Performance Optimization Lab</h1>
        <p>Session 9: useMemo & useCallback with {stats.total} users</p>
      </header>

      <div className="container">
        <div className="controls-section">
          <SearchBar onSearch={handleSearch} />
          <FilterControls
            sortBy={sortBy}
            filterBy={filterBy}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total Users</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.filtered}</span>
            <span className="stat-label">Filtered Results</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.departments}</span>
            <span className="stat-label">Departments</span>
          </div>
        </div>

        <UserList users={filteredAndSortedUsers} />
      </div>
    </div>
  )
}

export default App