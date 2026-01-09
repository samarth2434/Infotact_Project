// Week 4 - Session 11: Express.js Essentials
// Lab: Creating basic GET/POST routes

const express = require('express')
const path = require('path')
const fs = require('fs').promises

const app = express()
const PORT = process.env.PORT || 3011

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// In-memory data store (in real app, this would be a database)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' }
]

let posts = [
  { id: 1, title: 'Getting Started with Express', content: 'Express.js is a web framework...', authorId: 1 },
  { id: 2, title: 'RESTful API Design', content: 'REST principles for API design...', authorId: 2 }
]

let nextUserId = 4
let nextPostId = 3

// Routes

// Home route - serve HTML interface
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>🚀 Express.js Basic Routes Lab</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, textarea, select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        button { background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #218838; }
        .btn-secondary { background: #6c757d; }
        .btn-secondary:hover { background: #545b62; }
        .item { background: #f8f9fa; padding: 15px; margin-bottom: 10px; border-radius: 4px; border-left: 4px solid #28a745; }
        .item h4 { margin: 0 0 10px 0; color: #28a745; }
        .item p { margin: 5px 0; color: #666; }
        .methods { display: flex; gap: 10px; margin-bottom: 20px; }
        .method { padding: 5px 10px; border-radius: 4px; font-weight: bold; }
        .get { background: #d4edda; color: #155724; }
        .post { background: #d1ecf1; color: #0c5460; }
        .put { background: #fff3cd; color: #856404; }
        .delete { background: #f8d7da; color: #721c24; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚀 Express.js Basic Routes Lab</h1>
        <p>Session 11: Creating GET/POST routes with Express.js</p>
      </div>

      <div class="section">
        <h2>📋 Available Routes</h2>
        <div class="methods">
          <span class="method get">GET /api/users</span>
          <span class="method post">POST /api/users</span>
          <span class="method get">GET /api/posts</span>
          <span class="method post">POST /api/posts</span>
          <span class="method get">GET /api/stats</span>
        </div>
      </div>

      <div class="grid">
        <div class="section">
          <h2>👥 Users Management</h2>
          
          <h3>Add New User</h3>
          <form id="userForm">
            <div class="form-group">
              <label>Name:</label>
              <input type="text" id="userName" required>
            </div>
            <div class="form-group">
              <label>Email:</label>
              <input type="email" id="userEmail" required>
            </div>
            <div class="form-group">
              <label>Role:</label>
              <select id="userRole">
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button type="submit">Add User</button>
          </form>

          <h3>Users List</h3>
          <div id="usersList">Loading...</div>
          <button class="btn-secondary" onclick="loadUsers()">Refresh Users</button>
        </div>

        <div class="section">
          <h2>📝 Posts Management</h2>
          
          <h3>Add New Post</h3>
          <form id="postForm">
            <div class="form-group">
              <label>Title:</label>
              <input type="text" id="postTitle" required>
            </div>
            <div class="form-group">
              <label>Content:</label>
              <textarea id="postContent" rows="4" required></textarea>
            </div>
            <div class="form-group">
              <label>Author:</label>
              <select id="postAuthor" required>
                <option value="">Select Author</option>
              </select>
            </div>
            <button type="submit">Add Post</button>
          </form>

          <h3>Posts List</h3>
          <div id="postsList">Loading...</div>
          <button class="btn-secondary" onclick="loadPosts()">Refresh Posts</button>
        </div>
      </div>

      <div class="section">
        <h2>📊 API Statistics</h2>
        <div id="stats">Loading...</div>
        <button class="btn-secondary" onclick="loadStats()">Refresh Stats</button>
      </div>

      <script>
        // Load users
        async function loadUsers() {
          try {
            const response = await fetch('/api/users')
            const users = await response.json()
            
            document.getElementById('usersList').innerHTML = users.map(user => 
              '<div class="item">' +
                '<h4>' + user.name + '</h4>' +
                '<p>Email: ' + user.email + '</p>' +
                '<p>Role: ' + user.role + '</p>' +
                '<p>ID: ' + user.id + '</p>' +
              '</div>'
            ).join('')

            // Update author dropdown
            const authorSelect = document.getElementById('postAuthor')
            authorSelect.innerHTML = '<option value="">Select Author</option>' +
              users.map(user => '<option value="' + user.id + '">' + user.name + '</option>').join('')
            
          } catch (error) {
            document.getElementById('usersList').innerHTML = '<p>Error loading users</p>'
          }
        }

        // Load posts
        async function loadPosts() {
          try {
            const response = await fetch('/api/posts')
            const posts = await response.json()
            
            document.getElementById('postsList').innerHTML = posts.map(post => 
              '<div class="item">' +
                '<h4>' + post.title + '</h4>' +
                '<p>' + post.content.substring(0, 100) + '...</p>' +
                '<p>Author ID: ' + post.authorId + '</p>' +
                '<p>Post ID: ' + post.id + '</p>' +
              '</div>'
            ).join('')
            
          } catch (error) {
            document.getElementById('postsList').innerHTML = '<p>Error loading posts</p>'
          }
        }

        // Load stats
        async function loadStats() {
          try {
            const response = await fetch('/api/stats')
            const stats = await response.json()
            
            document.getElementById('stats').innerHTML = 
              '<div class="grid">' +
                '<div class="item"><h4>Total Users</h4><p>' + stats.totalUsers + '</p></div>' +
                '<div class="item"><h4>Total Posts</h4><p>' + stats.totalPosts + '</p></div>' +
                '<div class="item"><h4>Admin Users</h4><p>' + stats.adminUsers + '</p></div>' +
                '<div class="item"><h4>Server Uptime</h4><p>' + stats.uptime + '</p></div>' +
              '</div>'
            
          } catch (error) {
            document.getElementById('stats').innerHTML = '<p>Error loading stats</p>'
          }
        }

        // Add user form handler
        document.getElementById('userForm').addEventListener('submit', async (e) => {
          e.preventDefault()
          
          const userData = {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            role: document.getElementById('userRole').value
          }

          try {
            const response = await fetch('/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData)
            })

            if (response.ok) {
              document.getElementById('userForm').reset()
              loadUsers()
              loadStats()
              alert('User added successfully!')
            } else {
              alert('Error adding user')
            }
          } catch (error) {
            alert('Error adding user')
          }
        })

        // Add post form handler
        document.getElementById('postForm').addEventListener('submit', async (e) => {
          e.preventDefault()
          
          const postData = {
            title: document.getElementById('postTitle').value,
            content: document.getElementById('postContent').value,
            authorId: parseInt(document.getElementById('postAuthor').value)
          }

          try {
            const response = await fetch('/api/posts', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(postData)
            })

            if (response.ok) {
              document.getElementById('postForm').reset()
              loadPosts()
              loadStats()
              alert('Post added successfully!')
            } else {
              alert('Error adding post')
            }
          } catch (error) {
            alert('Error adding post')
          }
        })

        // Load initial data
        loadUsers()
        loadPosts()
        loadStats()

        // Auto-refresh every 10 seconds
        setInterval(() => {
          loadStats()
        }, 10000)
      </script>
    </body>
    </html>
  `
  res.send(html)
})

// API Routes

// GET /api/users - Get all users
app.get('/api/users', (req, res) => {
  res.json(users)
})

// POST /api/users - Create new user
app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body

  // Validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  // Check if email already exists
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ error: 'Email already exists' })
  }

  const newUser = {
    id: nextUserId++,
    name,
    email,
    role: role || 'User'
  }

  users.push(newUser)
  res.status(201).json(newUser)
})

// GET /api/posts - Get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts)
})

// POST /api/posts - Create new post
app.post('/api/posts', (req, res) => {
  const { title, content, authorId } = req.body

  // Validation
  if (!title || !content || !authorId) {
    return res.status(400).json({ error: 'Title, content, and authorId are required' })
  }

  // Check if author exists
  if (!users.find(user => user.id === authorId)) {
    return res.status(400).json({ error: 'Author not found' })
  }

  const newPost = {
    id: nextPostId++,
    title,
    content,
    authorId
  }

  posts.push(newPost)
  res.status(201).json(newPost)
})

// GET /api/stats - Get API statistics
app.get('/api/stats', (req, res) => {
  const stats = {
    totalUsers: users.length,
    totalPosts: posts.length,
    adminUsers: users.filter(user => user.role === 'Admin').length,
    uptime: process.uptime() + ' seconds'
  }
  res.json(stats)
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`)
  console.log(`📋 Available routes:`)
  console.log(`   GET  / - Web interface`)
  console.log(`   GET  /api/users - Get all users`)
  console.log(`   POST /api/users - Create user`)
  console.log(`   GET  /api/posts - Get all posts`)
  console.log(`   POST /api/posts - Create post`)
  console.log(`   GET  /api/stats - Get statistics`)
})

module.exports = app