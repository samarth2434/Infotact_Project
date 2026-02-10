// Week 5 - Session 14: Mongoose ODM
// Lab: Defining schemas with strict typing

const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/intelleq_academy'

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err))

// User Schema with Strict Typing
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  age: {
    type: Number,
    min: [18, 'Must be at least 18 years old'],
    max: [100, 'Age cannot exceed 100']
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profile: {
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    avatar: String,
    location: String
  },
  skills: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Virtual property
userSchema.virtual('profileUrl').get(function() {
  return `/users/${this._id}`
})

// Instance method
userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    profile: this.profile
  }
}

// Static method
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() })
}

const User = mongoose.model('User', userSchema)

// Course Schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  tags: [String],
  isPublished: {
    type: Boolean,
    default: false
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

const Course = mongoose.model('Course', courseSchema)

// Routes

// Create User
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).json({
      success: true,
      data: user.getPublicProfile()
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
})

// Get All Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json({
      success: true,
      count: users.length,
      data: users
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Get User by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Update User
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
})

// Delete User
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }
    res.json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Create Course
app.post('/api/courses', async (req, res) => {
  try {
    const course = new Course(req.body)
    await course.save()
    res.status(201).json({
      success: true,
      data: course
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
})

// Get All Courses with Instructor Info
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email')
    res.json({
      success: true,
      count: courses.length,
      data: courses
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Web Interface
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Week 5 - Mongoose ODM Lab</title>
      <style>
        body { font-family: Arial; max-width: 1200px; margin: 0 auto; padding: 20px; background: #f5f7fa; }
        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; text-align: center; }
        .section { background: white; padding: 25px; margin-bottom: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, select, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
        button { background: #28a745; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; margin: 5px; }
        button:hover { background: #218838; }
        .btn-secondary { background: #6c757d; }
        .users-list, .courses-list { display: grid; gap: 15px; }
        .item { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🗄️ Week 5: Mongoose ODM Lab</h1>
        <p>Session 14: Schemas, Models, and Data Validation</p>
      </div>

      <div class="section">
        <h2>👤 Create User</h2>
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
            <label>Age:</label>
            <input type="number" id="userAge" min="18" max="100">
          </div>
          <div class="form-group">
            <label>Role:</label>
            <select id="userRole">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
          <button type="submit">Create User</button>
        </form>
      </div>

      <div class="section">
        <h2>📚 Create Course</h2>
        <form id="courseForm">
          <div class="form-group">
            <label>Title:</label>
            <input type="text" id="courseTitle" required>
          </div>
          <div class="form-group">
            <label>Description:</label>
            <textarea id="courseDesc" rows="3" required></textarea>
          </div>
          <div class="form-group">
            <label>Instructor ID:</label>
            <input type="text" id="instructorId" required>
          </div>
          <div class="form-group">
            <label>Duration (hours):</label>
            <input type="number" id="courseDuration" min="1" required>
          </div>
          <div class="form-group">
            <label>Price:</label>
            <input type="number" id="coursePrice" min="0" required>
          </div>
          <button type="submit">Create Course</button>
        </form>
      </div>

      <div class="section">
        <h2>👥 Users List</h2>
        <button onclick="loadUsers()">Refresh Users</button>
        <div id="usersList" class="users-list"></div>
      </div>

      <div class="section">
        <h2>📚 Courses List</h2>
        <button onclick="loadCourses()">Refresh Courses</button>
        <div id="coursesList" class="courses-list"></div>
      </div>

      <script>
        // Create User
        document.getElementById('userForm').addEventListener('submit', async (e) => {
          e.preventDefault()
          const userData = {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            age: parseInt(document.getElementById('userAge').value),
            role: document.getElementById('userRole').value
          }
          
          try {
            const response = await fetch('/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData)
            })
            const data = await response.json()
            if (data.success) {
              alert('User created successfully!')
              document.getElementById('userForm').reset()
              loadUsers()
            } else {
              alert('Error: ' + data.error)
            }
          } catch (error) {
            alert('Error creating user')
          }
        })

        // Create Course
        document.getElementById('courseForm').addEventListener('submit', async (e) => {
          e.preventDefault()
          const courseData = {
            title: document.getElementById('courseTitle').value,
            description: document.getElementById('courseDesc').value,
            instructor: document.getElementById('instructorId').value,
            duration: parseInt(document.getElementById('courseDuration').value),
            price: parseFloat(document.getElementById('coursePrice').value)
          }
          
          try {
            const response = await fetch('/api/courses', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(courseData)
            })
            const data = await response.json()
            if (data.success) {
              alert('Course created successfully!')
              document.getElementById('courseForm').reset()
              loadCourses()
            } else {
              alert('Error: ' + data.error)
            }
          } catch (error) {
            alert('Error creating course')
          }
        })

        // Load Users
        async function loadUsers() {
          try {
            const response = await fetch('/api/users')
            const data = await response.json()
            const usersList = document.getElementById('usersList')
            
            if (data.success && data.data.length > 0) {
              usersList.innerHTML = data.data.map(user => 
                '<div class="item">' +
                  '<h4>' + user.name + '</h4>' +
                  '<p>Email: ' + user.email + '</p>' +
                  '<p>Role: ' + user.role + '</p>' +
                  '<p>ID: ' + user._id + '</p>' +
                '</div>'
              ).join('')
            } else {
              usersList.innerHTML = '<p>No users found</p>'
            }
          } catch (error) {
            document.getElementById('usersList').innerHTML = '<p>Error loading users</p>'
          }
        }

        // Load Courses
        async function loadCourses() {
          try {
            const response = await fetch('/api/courses')
            const data = await response.json()
            const coursesList = document.getElementById('coursesList')
            
            if (data.success && data.data.length > 0) {
              coursesList.innerHTML = data.data.map(course => 
                '<div class="item">' +
                  '<h4>' + course.title + '</h4>' +
                  '<p>' + course.description + '</p>' +
                  '<p>Instructor: ' + (course.instructor ? course.instructor.name : 'N/A') + '</p>' +
                  '<p>Duration: ' + course.duration + ' hours | Price: $' + course.price + '</p>' +
                '</div>'
              ).join('')
            } else {
              coursesList.innerHTML = '<p>No courses found</p>'
            }
          } catch (error) {
            document.getElementById('coursesList').innerHTML = '<p>Error loading courses</p>'
          }
        }

        // Load initial data
        loadUsers()
        loadCourses()
      </script>
    </body>
    </html>
  `)
})

const PORT = process.env.PORT || 3013
app.listen(PORT, () => {
  console.log(`🚀 Week 5 - Mongoose ODM Lab running on http://localhost:${PORT}`)
  console.log(`📊 MongoDB Connection: ${MONGODB_URI}`)
})

module.exports = app