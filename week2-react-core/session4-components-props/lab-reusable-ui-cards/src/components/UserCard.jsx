import React from 'react'

const UserCard = ({ user, onViewProfile, onSendMessage }) => {
  return (
    <div className="user-card">
      <div className="card-header">
        <div className="avatar">
          <img 
            src={`https://ui-avatars.com/api/?name=${user.name}&background=667eea&color=fff&size=80`}
            alt={user.name}
            className="avatar-img"
          />
          <div className={`status-indicator ${user.isOnline ? 'online' : 'offline'}`}></div>
        </div>
        <div className="user-info">
          <h3 className="user-name">{user.name}</h3>
          <p className="user-role">{user.role}</p>
          <p className="user-location">📍 {user.location}</p>
        </div>
      </div>
      
      <div className="card-body">
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{user.projects}</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{user.followers}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{user.rating}</span>
            <span className="stat-label">Rating</span>
          </div>
        </div>
        
        <div className="skills">
          {user.skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="card-footer">
        <button 
          className="btn btn-primary"
          onClick={() => onViewProfile(user.id)}
        >
          View Profile
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => onSendMessage(user.id)}
        >
          Send Message
        </button>
      </div>
    </div>
  )
}

export default UserCard