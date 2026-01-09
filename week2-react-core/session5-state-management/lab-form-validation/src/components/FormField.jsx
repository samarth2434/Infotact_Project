import React from 'react'

const FormField = ({ 
  label, 
  type, 
  name, 
  value, 
  error, 
  onChange, 
  options = [], 
  required = false,
  placeholder,
  min,
  max
}) => {
  const handleChange = (e) => {
    const newValue = type === 'checkbox' ? e.target.checked : e.target.value
    onChange(name, newValue)
  }

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            className={`form-input ${error ? 'error' : ''}`}
            required={required}
          >
            <option value="">Select {label}</option>
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      
      case 'checkbox':
        return (
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={value}
              onChange={handleChange}
              className={`form-checkbox ${error ? 'error' : ''}`}
              required={required}
            />
            <label htmlFor={name} className="checkbox-label">
              {label}
            </label>
          </div>
        )
      
      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            className={`form-input ${error ? 'error' : ''}`}
            placeholder={placeholder}
            required={required}
            min={min}
            max={max}
          />
        )
    }
  }

  if (type === 'checkbox') {
    return (
      <div className="form-field checkbox-field">
        {renderInput()}
        {error && <span className="error-message">{error}</span>}
      </div>
    )
  }

  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="required">*</span>}
      </label>
      {renderInput()}
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

export default FormField