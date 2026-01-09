import React, { useState } from 'react'
import UserCard from './components/UserCard'
import ProductCard from './components/ProductCard'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('users')
  
  // Sample user data
  const users = [
    {
      id: 1,
      name: 'Arjun Sharma',
      role: 'Full Stack Developer',
      location: 'Mumbai, India',
      projects: 24,
      followers: 1200,
      rating: 4.8,
      skills: ['React', 'Node.js', 'MongoDB'],
      isOnline: true
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'UI/UX Designer',
      location: 'Bangalore, India',
      projects: 18,
      followers: 890,
      rating: 4.9,
      skills: ['Figma', 'Adobe XD', 'Sketch'],
      isOnline: false
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      role: 'DevOps Engineer',
      location: 'Delhi, India',
      projects: 31,
      followers: 1500,
      rating: 4.7,
      skills: ['AWS', 'Docker', 'Kubernetes'],
      isOnline: true
    }
  ]
  
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      description: 'Premium quality wireless headphones with noise cancellation',
      price: 99.99,
      originalPrice: 149.99,
      rating: 4,
      reviews: 128,
      inStock: true,
      isNew: true
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'Wearables',
      description: 'Feature-rich smartwatch with health monitoring',
      price: 199.99,
      originalPrice: 199.99,
      rating: 5,
      reviews: 89,
      inStock: true,
      isNew: false
    },
    {
      id: 3,
      name: 'Laptop Stand',
      category: 'Accessories',
      description: 'Ergonomic laptop stand for better posture',
      price: 49.99,
      originalPrice: 69.99,
      rating: 4,
      reviews: 45,
      inStock: false,
      isNew: false
    }
  ]
  
  // Event handlers
  const handleViewProfile = (userId) => {
    alert(`Viewing profile for user ID: ${userId}`)
  }
  
  const handleSendMessage = (userId) => {
    alert(`Sending message to user ID: ${userId}`)
  }
  
  const handleAddToCart = (product) => {
    alert(`Added "${product.name}" to cart!`)
  }
  
  const handleViewDetails = (productId) => {
    alert(`Viewing details for product ID: ${productId}`)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 Reusable UI Cards Lab</h1>
        <p>Session 4: Components & Props</p>
      </header>
      
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 User Cards
        </button>
        <button 
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          🛍️ Product Cards
        </button>
      </div>
      
      <main className="main-content">
        {activeTab === 'users' && (
          <div className="cards-grid">
            {users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onViewProfile={handleViewProfile}
                onSendMessage={handleSendMessage}
              />
            ))}
          </div>
        )}
        
        {activeTab === 'products' && (
          <div className="cards-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App