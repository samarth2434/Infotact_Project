import React from 'react'

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  
  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image || `https://picsum.photos/300/200?random=${product.id}`}
          alt={product.name}
          className="product-img"
        />
        {product.isNew && <span className="badge new-badge">New</span>}
        {discountPercentage > 0 && (
          <span className="badge discount-badge">-{discountPercentage}%</span>
        )}
        <div className="product-overlay">
          <button 
            className="overlay-btn"
            onClick={() => onViewDetails(product.id)}
          >
            👁️ Quick View
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`star ${i < product.rating ? 'filled' : ''}`}
            >
              ⭐
            </span>
          ))}
          <span className="rating-text">({product.reviews} reviews)</span>
        </div>
        
        <div className="product-price">
          <span className="current-price">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>
        
        <div className="product-actions">
          <button 
            className="btn btn-primary add-to-cart"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
          >
            {product.inStock ? '🛒 Add to Cart' : '❌ Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard