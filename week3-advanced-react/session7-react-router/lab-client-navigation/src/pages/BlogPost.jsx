import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const BlogPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock blog post data
  const blogPosts = {
    1: {
      title: 'Getting Started with React Router',
      content: `
        React Router is the standard routing library for React applications. It enables you to create single-page applications with navigation without the page refreshing as the user navigates.

        ## Installation

        First, install React Router in your project:

        \`\`\`bash
        npm install react-router-dom
        \`\`\`

        ## Basic Setup

        Wrap your app with BrowserRouter and define your routes:

        \`\`\`jsx
        import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

        function App() {
          return (
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Router>
          )
        }
        \`\`\`

        ## Navigation

        Use Link or NavLink components for navigation:

        \`\`\`jsx
        import { Link, NavLink } from 'react-router-dom'

        function Navbar() {
          return (
            <nav>
              <Link to="/">Home</Link>
              <NavLink to="/about">About</NavLink>
            </nav>
          )
        }
        \`\`\`

        This is just the beginning! React Router offers much more including nested routes, protected routes, and programmatic navigation.
      `,
      author: 'John Doe',
      date: '2024-01-15',
      category: 'React',
      readTime: '5 min read'
    },
    2: {
      title: 'Mastering React Hooks',
      content: `
        React Hooks revolutionized how we write React components. They allow you to use state and other React features in functional components.

        ## useState Hook

        The most basic hook for managing component state:

        \`\`\`jsx
        import { useState } from 'react'

        function Counter() {
          const [count, setCount] = useState(0)

          return (
            <div>
              <p>Count: {count}</p>
              <button onClick={() => setCount(count + 1)}>
                Increment
              </button>
            </div>
          )
        }
        \`\`\`

        ## useEffect Hook

        Handle side effects in your components:

        \`\`\`jsx
        import { useState, useEffect } from 'react'

        function UserProfile({ userId }) {
          const [user, setUser] = useState(null)

          useEffect(() => {
            fetchUser(userId).then(setUser)
          }, [userId])

          return user ? <div>{user.name}</div> : <div>Loading...</div>
        }
        \`\`\`

        ## Custom Hooks

        Create reusable stateful logic:

        \`\`\`jsx
        function useCounter(initialValue = 0) {
          const [count, setCount] = useState(initialValue)

          const increment = () => setCount(count + 1)
          const decrement = () => setCount(count - 1)
          const reset = () => setCount(initialValue)

          return { count, increment, decrement, reset }
        }
        \`\`\`

        Hooks make React components more powerful and reusable!
      `,
      author: 'Jane Smith',
      date: '2024-01-12',
      category: 'React',
      readTime: '8 min read'
    }
  }

  const post = blogPosts[id]

  if (!post) {
    return (
      <div className="page">
        <div className="container">
          <div className="not-found">
            <h1>Post Not Found</h1>
            <p>The blog post you're looking for doesn't exist.</p>
            <button className="btn btn-primary" onClick={() => navigate('/blog')}>
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    )
  }

  const handleBackToBlog = () => {
    navigate('/blog')
  }

  return (
    <div className="page blog-post-page">
      <div className="container">
        <button className="back-btn" onClick={handleBackToBlog}>
          ← Back to Blog
        </button>

        <article className="blog-post">
          <header className="post-header">
            <div className="post-meta">
              <span className="category">{post.category}</span>
              <span className="read-time">{post.readTime}</span>
            </div>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-info">
              <span className="author">By {post.author}</span>
              <span className="date">{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </header>

          <div className="post-content">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim().startsWith('##')) {
                return <h2 key={index}>{paragraph.replace('##', '').trim()}</h2>
              }
              if (paragraph.trim().startsWith('```')) {
                return null // Handle code blocks separately if needed
              }
              if (paragraph.trim()) {
                return <p key={index}>{paragraph.trim()}</p>
              }
              return <br key={index} />
            })}
          </div>
        </article>
      </div>
    </div>
  )
}

export default BlogPost