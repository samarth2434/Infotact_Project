import React from 'react'

const DynamicCard = ({ 
  type = 'info', 
  title, 
  content, 
  icon, 
  extra, 
  showActions = false, 
  onAction 
}) => {
  const getCardClass = () => {
    return `dynamic-card card-${type}`
  }

  const renderActions = () => {
    if (!showActions) return null

    const actions = {
      info: ['Learn More', 'Dismiss'],
      success: ['Continue', 'Close'],
      warning: ['Review', 'Ignore'],
      error: ['Retry', 'Report'],
      profile: ['View Profile', 'Send Message']
    }

    return (
      <div className="card-actions">
        {actions[type]?.map((action, index) => (
          <button
            key={index}
            className={`action-btn ${index === 0 ? 'primary' : 'secondary'}`}
            onClick={() => onAction(action)}
          >
            {action}
          </button>
        ))}
      </div>
    )
  }

  const renderExtra = () => {
    if (!extra) return null

    return (
      <div className="card-extra">
        {extra.email && (
          <div className="extra-item">
            <span className="extra-icon">📧</span>
            <span>{extra.email}</span>
          </div>
        )}
        {extra.location && (
          <div className="extra-item">
            <span className="extra-icon">📍</span>
            <span>{extra.location}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={getCardClass()}>
      <div className="card-header">
        {icon && <span className="card-icon">{icon}</span>}
        <h3 className="card-title">{title}</h3>
      </div>
      
      <div className="card-body">
        <p className="card-content">{content}</p>
        {renderExtra()}
      </div>
      
      {renderActions()}
    </div>
  )
}

export default DynamicCard