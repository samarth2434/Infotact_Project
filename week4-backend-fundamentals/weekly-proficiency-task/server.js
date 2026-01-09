// Week 4 - Weekly Proficiency Task
// Build a standalone REST API with full CRUD operations

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

// Import custom middleware
const logger = require('./src/middleware/logger')
const errorHandler = require('./src/middleware/errorHandler')
const validation = require('./src/middleware/validation')

// Import routes
const userRoutes = require('./src/routes/users')
const postRoutes = require('./src/routes/posts')
const authRoutes = require('./src/routes/auth')

// Import database
const db = require('./src/models/mockDatabase')

const app = express()
const PORT = process.env.PORT || 3012

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'))

// Custom middleware
app.use(logger)

// Serve static files
app.use(express.static('public'))

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

// Root route - API Documentation
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>🎯 Week 4 Proficiency Task - REST API</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f5f7fa; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; border-radius: 12px; margin-bottom: 30px; text-align: center; }
        .header h1 { margin: 0 0 10px 0; font-size: 2.5em; }
        .header p { margin: 0; font-size: 1.2em; opacity: 0.9; }
        .section { background: white; padding: 30px; margin-bottom: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .section h2 { color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        .endpoints { display: grid; gap: 15px; }
        .endpoint { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; }
        .method { display: inline-block; padding: 4px 12px; border-radius: 4px; font-weight: bold; font-size: 0.9em; margin-right: 10px; }
        .get { background: #d4edda; color: #155724; }
        .post { background: #d1ecf1; color: #0c5460; }
        .put { background: #fff3cd; color: #856404; }
        .delete { background: #f8d7da; color: #721c24; }
        .url { font-family: 'Courier New', monospace; font-weight: bold; color: #333; }
        .description { color: #666; margin-top: 8px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); text-align: center; }
        .stat-number { font-size: 2.5em; font-weight: bold; color: #667eea; margin-bottom: 5px; }
        .stat-label { color: #666; font-size: 0.9em; }
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .feature { background: #f8f9fa; padding: 20px; border-radius: 8px; }
        .feature h3 { color: #667eea; margin-top: 0; }
        .test-section { background: #e8f5e9; padding: 20px; border-radius: 8px; margin-top: 20px; }
        .test-btn { background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 5px; }
        .test-btn:hover { background: #218838; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 REST API Proficiency Task</h1>
          <p>Week 4: Backend Fundamentals with Express.js</p>
        </div>

        <div class="stats" id="stats">
          <div class="stat-card">
            <div class="stat-number" id="userCount">0</div>
            <div class="stat-label">Total Users</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" id="postCount">0</div>
            <div class="stat-label">Total Posts</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" id="requestCount">0</div>
            <div class="stat-label">API Requests</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" id="uptime">0s</div>
            <div class="stat-label">Server Uptime</div>
          </div>
        </div>

        <div class="section">
          <h2>🔐 Authentication Endpoints</h2>
          <div class="endpoints">
            <div class="endpoint">
              <span class="method post">POST</span>
              <span class="url">/api/auth/register</span>
              <div class="description">Register a new user account</div>
            </div>
            <div class="endpoint">
              <span class="method post">POST</span>
              <span class="url">/api/auth/login</span>
              <div class="description">Login with email and password</div>
            </div>
            <div class="endpoint">
              <span class="method get">GET</span>
              <span class="url">/api/auth/profile</span>
              <div class="description">Get current user profile (requires token)</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>👥 User Management Endpoints</h2>
          <div class="endpoints">
            <div class="endpoint">
              <span class="method get">GET</span>
              <span class="url">/api/users</span>
              <div class="description">Get all users with pagination</div>
            </div>
            <div class="endpoint">
              <span class="method get">GET</span>
              <span class="url">/api/users/:id</span>
              <div class="description">Get user by ID</div>
            </div>
            <div class="endpoint">
              <span class="method post">POST</span>
              <span class="url">/api/users</span>
              <div class="description">Create a new user</div>
            </div>
            <div class="endpoint">
              <span class="method put">PUT</span>
              <span class="url">/api/users/:id</span>
              <div class="description">Update user by ID</div>
            </div>
            <div class="endpoint">
              <span class="method delete">DELETE</span>
              <span class="url">/api/users/:id</span>
              <div class="description">Delete user by ID</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>📝 Posts Management Endpoints</h2>
          <div class="endpoints">
            <div class="endpoint">
              <span class="method get">GET</span>
              <span class="url">/api/posts</span>
              <div class="description">Get all posts with author information</div>
            </div>
            <div class="endpoint">
              <span class="method get">GET</span>
              <span class="url">/api/posts/:id</span>
              <div class="description">Get post by ID</div>
            </div>
            <div class="endpoint">
              <span class="method post">POST</span>
              <span class="url">/api/posts</span>
              <div class="description">Create a new post</div>
            </div>
            <div class="endpoint">
              <span class="method put">PUT</span>
              <span class="url">/api/posts/:id</span>
              <div class="description">Update post by ID</div>
            </div>
            <div class="endpoint">
              <span class="method delete">DELETE</span>
              <span class="url">/api/posts/:id</span>
              <div class="description">Delete post by ID</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>🚀 Key Features</h2>
          <div class="features">
            <div class="feature">
              <h3>✅ Full CRUD Operations</h3>
              <p>Complete Create, Read, Update, Delete functionality for all resources</p>
            </div>
            <div class="feature">
              <h3>🛡️ Custom Middleware</h3>
              <p>Request logging, error handling, and input validation middleware</p>
            </div>
            <div class="feature">
              <h3>📊 RESTful Design</h3>
              <p>Proper HTTP methods, status codes, and resource-based URLs</p>
            </div>
            <div class="feature">
              <h3>🔐 Authentication</h3>
              <p>JWT-based authentication with protected routes</p>
            </div>
            <div class="feature">
              <h3>📝 Request Logging</h3>
              <p>Comprehensive logging of all API requests and responses</p>
            </div>
            <div class="feature">
              <h3>⚡ In-Memory Storage</h3>
              <p>Fast in-memory database with data persistence simulation</p>
            </div>
          </div>
        </div>

        <div class="test-section">
          <h3>🧪 Quick API Tests</h3>
          <p>Test the API endpoints directly from this interface:</p>
          <button class="test-btn" onclick="testEndpoint('GET', '/api/users')">Get Users</button>
          <button class="test-btn" onclick="testEndpoint('GET', '/api/posts')">Get Posts</button>
          <button class="test-btn" onclick="createSampleUser()">Create Sample User</button>
          <button class="test-btn" onclick="createSamplePost()">Create Sample Post</button>
          <div id="testResults" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; display: none;">
            <h4>Test Results:</h4>
            <pre id="testOutput"></pre>
          </div>
        </div>
      </div>

      <script>
        async function updateStats() {
          try {
            const [usersRes, postsRes] = await Promise.all([
              fetch('/api/users'),
              fetch('/api/posts')
            ])
            
            const users = await usersRes.json()
            const posts = await postsRes.json()
            
            document.getElementById('userCount').textContent = users.data?.length || 0
            document.getElementById('postCount').textContent = posts.data?.length || 0
            
            // Update uptime (mock)
            const uptime = Math.floor(Date.now() / 1000) % 3600
            document.getElementById('uptime').textContent = uptime + 's'
            
          } catch (error) {
            console.error('Failed to update stats:', error)
          }
        }

        async function testEndpoint(method, url) {
          try {
            const response = await fetch(url, { method })
            const data = await response.json()
            
            document.getElementById('testResults').style.display = 'block'
            document.getElementById('testOutput').textContent = JSON.stringify(data, null, 2)
            
          } catch (error) {
            document.getElementById('testResults').style.display = 'block'
            document.getElementById('testOutput').textContent = 'Error: ' + error.message
          }
        }

        async function createSampleUser() {
          try {
            const userData = {
              name: 'Test User ' + Date.now(),
              email: 'test' + Date.now() + '@example.com',
              role: 'User'
            }
            
            const response = await fetch('/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData)
            })
            
            const data = await response.json()
            document.getElementById('testResults').style.display = 'block'
            document.getElementById('testOutput').textContent = JSON.stringify(data, null, 2)
            updateStats()
            
          } catch (error) {
            document.getElementById('testResults').style.display = 'block'
            document.getElementById('testOutput').textContent = 'Error: ' + error.message
          }
        }

        async function createSamplePost() {
          try {
            const postData = {
              title: 'Sample Post ' + Date.now(),
              content: 'This is a sample post created from the API documentation interface.',
              authorId: 1
            }
            
            const response = await fetch('/api/posts', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(postData)
            })
            
            const data = await response.json()
            document.getElementById('testResults').style.display = 'block'
            document.getElementById('testOutput').textContent = JSON.stringify(data, null, 2)
            updateStats()
            
          } catch (error) {
            document.getElementById('testResults').style.display = 'block'
            document.getElementById('testOutput').textContent = 'Error: ' + error.message
          }
        }

        // Update stats on page load and every 10 seconds
        updateStats()
        setInterval(updateStats, 10000)
      </script>
    </body>
    </html>
  `
  res.send(html)
})

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  })
})

// Error handling middleware (must be last)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🎯 Week 4 Proficiency Task API running on http://localhost:${PORT}`)
  console.log(`📚 API Documentation: http://localhost:${PORT}`)
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`)
  console.log(`📊 Database initialized with ${db.getStats().users} users and ${db.getStats().posts} posts`)
})

module.exports = app