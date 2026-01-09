// React Component - User List Container

import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import { getUserData } from './dataModule';
import './styles.css';

/**
 * UserList Component
 * Main container that fetches data and renders user cards
 */
const UserList = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('all');

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getUserData();
        
        if (data) {
          setUserData(data);
        } else {
          setError('Failed to load user data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter users by city
  const getFilteredUsers = () => {
    if (!userData) return [];
    
    if (selectedCity === 'all') {
      return userData.users;
    }
    
    return userData.users.filter(user => user.city === selectedCity);
  };

  // Loading state
  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container">
        <div className="error">
          <h2>❌ Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const filteredUsers = getFilteredUsers();

  return (
    <div className="container">
      <header className="header">
        <h1>👥 User Directory</h1>
        <p className="subtitle">
          Fetched {userData.totalCount} users from API
        </p>
      </header>

      <div className="filters">
        <button
          className={selectedCity === 'all' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setSelectedCity('all')}
        >
          All Cities ({userData.totalCount})
        </button>
        
        {userData.cities.map(city => (
          <button
            key={city}
            className={selectedCity === city ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setSelectedCity(city)}
          >
            {city} ({userData.usersByCity[city].length})
          </button>
        ))}
      </div>

      <div className="user-grid">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="empty-state">
          <p>No users found in this city</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
