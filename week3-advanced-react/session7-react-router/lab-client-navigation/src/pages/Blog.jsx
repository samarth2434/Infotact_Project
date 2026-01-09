import React from 'react'
import { useNavigate } from 'react-router-dom'

const Blog = () => {
  const navigate = useNavigate()

  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with React Router',
      excerpt: 'Learn how to implement client-side routing in your React applications.',
      author: 'John Doe',
      date: '2024-01-15',
      category: 'React',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Mastering React Hooks',
      excerpt: 'Deep dive into useState, useEffect, and custom hooks.',
      author: 'Jane Smith',
      date: '2024-01-12',
      category: 'React',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: 'Context API vs Redux',
      excerpt: 'When to use Context API and when to choose Redux for state management.',
      author: 'Mike Johnson',
      date: '2024-01-10',
      category: 'State Management',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Performance Optimization in React',
      excerpt: 'Tips and tricks to make your React apps lightning fast.',
      author: 'Sarah Wilson',
      date: '2024-01-08',
      category: 'Performance',
      readTime: '10 min read'
    }
  ]

  const handleReadMore = (postId) => {
    navigate(`/blog/${postId}`)
  }

  return (
    <div className="page blog-page">
      <div className="container">
        <header className="page-header">
          <h1>📝 Our Blog</h1>
          <p>Stay updated with the latest in web development</p>
        </header>

        <div className="blog-grid">
          {blogPosts.map(post => (
            <article key={post.id} className="blog-card">
              <div className="blog-meta">
                <span className="category">{post.category}</span>
                <span className="read-time">{post.readTime}</span>
              </div>
              
              <h2 className="blog-title">{post.title}</h2>
              <p className="blog-excerpt">{post.excerpt}</p>
              
              <div className="blog-footer">
                <div className="author-info">
                  <span className="author">By {post.author}</span>
                  <span className="date">{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <button 
                  className="read-more-btn"
                  onClick={() => handleReadMore(post.id)}
                >
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog