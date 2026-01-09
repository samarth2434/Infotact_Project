# Week 4: Backend Fundamentals — Node.js & Express

## IntelleQ Academy Internship Project

### Domain Focus
Understanding server-side JavaScript execution, designing RESTful API contracts, and managing the request-response lifecycle using Express.js middleware.

### Weekly Proficiency Task
Build a standalone REST API using Express.js that implements full CRUD operations on a mock dataset, utilizes custom middleware for logging and error handling, and demonstrates proper HTTP status codes and response formatting.

---

## Project Structure

```
week4-backend-fundamentals/
├── session10-nodejs-runtime/
│   ├── lab-file-logger/              # Building a simple file logger system
│   └── task-json-parser/             # Create a script to parse data files to JSON
├── session11-express-essentials/
│   ├── lab-basic-routes/             # Creating basic GET/POST routes
│   └── task-mock-api/                # Build a mock API server responding with JSON
├── session12-middleware-rest/
│   ├── lab-request-logger/           # Implementing a Request Logger middleware
│   └── task-crud-api/                # Develop a CRUD API with in-memory storage
├── weekly-proficiency-task/          # ⭐ MAIN ASSESSMENT TASK
│   ├── src/
│   │   ├── middleware/
│   │   │   ├── logger.js             # Custom logging middleware
│   │   │   ├── errorHandler.js       # Error handling middleware
│   │   │   └── validation.js         # Request validation middleware
│   │   ├── routes/
│   │   │   ├── users.js              # User CRUD routes
│   │   │   ├── posts.js              # Posts CRUD routes
│   │   │   └── auth.js               # Authentication routes
│   │   ├── models/
│   │   │   └── mockDatabase.js       # In-memory data storage
│   │   └── app.js                    # Express app configuration
│   ├── server.js                     # Server entry point
│   └── package.json                  # Dependencies
└── README.md
```

---

## Session 10: Node.js Runtime

### Topics Covered
- Node.js Architecture (Event Loop)
- File System (fs) & Path modules
- HTTP Server basics

### Tasks
- **Lab**: Building a simple file logger system
- **Task**: Create a script to parse data files to JSON

---

## Session 11: Express.js Essentials

### Topics Covered
- Setting up an Express Server
- Routing & Request/Response Objects
- Serving Static Files

### Tasks
- **Lab**: Creating basic GET/POST routes
- **Task**: Build a mock API server responding with JSON

---

## Session 12: Middleware & REST APIs

### Topics Covered
- Application vs Router level middleware
- Error Handling Middleware
- REST Principles (CRUD)

### Tasks
- **Lab**: Implementing a Request Logger middleware
- **Task**: Develop a CRUD API with in-memory storage

---

## Weekly Proficiency Task Features

### ✅ Full CRUD Operations
- Create, Read, Update, Delete for Users and Posts
- Proper HTTP status codes (200, 201, 400, 404, 500)
- JSON request/response formatting

### ✅ Custom Middleware
- Request logging with timestamps
- Error handling with stack traces
- Input validation middleware

### ✅ RESTful API Design
- Resource-based URLs (/api/users, /api/posts)
- HTTP methods mapping (GET, POST, PUT, DELETE)
- Consistent response structure

---

## Getting Started

```bash
# Navigate to Week 4 project
cd week4-backend-fundamentals

# Session 10: Node.js Runtime
cd session10-nodejs-runtime/lab-file-logger
node server.js

# Session 11: Express Essentials
cd session11-express-essentials/lab-basic-routes
npm install
node server.js

# Weekly Proficiency Task
cd weekly-proficiency-task
npm install
npm start
```

---

## API Endpoints

### Session 10 - File Logger (Port 3010)
- `GET /` - Web interface for log management
- `POST /log` - Create new log entry
- `GET /logs?date=YYYY-MM-DD` - Get logs for specific date
- `GET /stats` - Get logging statistics

### Session 11 - Basic Routes (Port 3011)
- `GET /` - Web interface for API testing
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/stats` - Get API statistics

### Weekly Task - Full REST API (Port 3012)
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- Similar endpoints for posts and authentication

---

## Learning Outcomes

By the end of Week 4, you will master:
- ✅ Node.js runtime and event loop
- ✅ File system operations and path handling
- ✅ HTTP server creation and request handling
- ✅ Express.js framework fundamentals
- ✅ Middleware patterns and custom middleware
- ✅ RESTful API design principles
- ✅ CRUD operations implementation
- ✅ Error handling and logging
- ✅ JSON data manipulation

---

## Current Status

**Session 10 Lab**: ✅ **RUNNING** on http://localhost:3010/
- File logger system with web interface
- Real-time log viewing and statistics

**Session 11 Lab**: Ready to run
**Session 12 Lab**: Ready to run
**Weekly Task**: Ready to run

---

**IntelleQ Academy** - Week 4: Backend Fundamentals Mastery 🚀