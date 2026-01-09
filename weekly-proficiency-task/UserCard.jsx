// React Component - User Card (Static Structure)

import React from 'react';

/**
 * UserCard Component
 * Displays individual user information in a card format
 */
const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-header">
        <div className="user-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="user-info">
          <h3 className="user-name">{user.name}</h3>
          <p className="user-username">@{user.username}</p>
        </div>
      </div>
      
      <div className="user-details">
        <div className="detail-item">
          <span className="detail-icon">📧</span>
          <span className="detail-text">{user.email}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-icon">🏢</span>
          <span className="detail-text">{user.company}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-icon">📍</span>
          <span className="detail-text">{user.city}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-icon">🌐</span>
          <a 
            href={`https://${user.website}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="detail-link"
          >
            {user.website}
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
