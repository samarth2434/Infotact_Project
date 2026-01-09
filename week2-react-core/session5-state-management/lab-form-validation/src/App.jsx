import React, { useState } from 'react'
import FormField from './components/FormField'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    age: '',
    country: '',
    terms: false
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.length < 2 ? 'Must be at least 2 characters' : ''
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? 'Invalid email format' : ''
      
      case 'phone':
        const phoneRegex = /^\+?[\d\s-()]{10,}$/
        return !phoneRegex.test(value) ? 'Invalid phone number' : ''
      
      case 'password':
        if (value.length < 8) return 'Password must be at least 8 characters'
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain uppercase, lowercase, and number'
        }
        return ''
      
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : ''
      
      case 'age':
        const ageNum = parseInt(value)
        return ageNum < 18 || ageNum > 100 ? 'Age must be between 18 and 100' : ''
      
      case 'country':
        return value === '' ? 'Please select a country' : ''
      
      case 'terms':
        return !value ? 'You must accept the terms and conditions' : ''
      
      default:
        return ''
    }
  }

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Real-time validation
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitSuccess(true)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        age: '',
        country: '',
        terms: false
      })
      setErrors({})
    } catch (error) {
      console.error('Submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const countries = [
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
    'Germany', 'France', 'Japan', 'Singapore', 'UAE'
  ]

  if (submitSuccess) {
    return (
      <div className="app">
        <div className="success-message">
          <h1>🎉 Registration Successful!</h1>
          <p>Thank you for signing up. We've sent a confirmation email.</p>
          <button 
            className="btn btn-primary"
            onClick={() => setSubmitSuccess(false)}
          >
            Register Another User
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Form Validation Lab</h1>
        <p>Session 5: State Management & Event Handling</p>
      </header>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <FormField
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            error={errors.firstName}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            error={errors.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <FormField
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          error={errors.email}
          onChange={handleInputChange}
          required
        />

        <FormField
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          error={errors.phone}
          onChange={handleInputChange}
          placeholder="+91 98765 43210"
          required
        />

        <div className="form-row">
          <FormField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            error={errors.password}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            error={errors.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <FormField
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            error={errors.age}
            onChange={handleInputChange}
            min="18"
            max="100"
            required
          />
          <FormField
            label="Country"
            type="select"
            name="country"
            value={formData.country}
            error={errors.country}
            onChange={handleInputChange}
            options={countries}
            required
          />
        </div>

        <FormField
          label="I agree to the Terms and Conditions"
          type="checkbox"
          name="terms"
          value={formData.terms}
          error={errors.terms}
          onChange={handleInputChange}
          required
        />

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? '⏳ Registering...' : '🚀 Register'}
        </button>
      </form>
    </div>
  )
}

export default App