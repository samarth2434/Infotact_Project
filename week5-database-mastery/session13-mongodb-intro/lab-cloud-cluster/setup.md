# Week 5 - Session 13: MongoDB Atlas Cloud Setup

## Lab: Setting up a cloud database cluster

### Step 1: MongoDB Atlas Account Setup
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (M0 Free Tier)

### Step 2: Database Configuration
```javascript
// Connection String Example
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/intelleq_academy

// Database Name: intelleq_academy
// Collections: users, posts, courses
```

### Step 3: Network Access
- Add IP Address: 0.0.0.0/0 (Allow from anywhere for development)
- Create Database User with password

### Completed! ✅
Your MongoDB Atlas cluster is ready to use.