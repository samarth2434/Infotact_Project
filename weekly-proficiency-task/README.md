# Weekly Proficiency Task - Week 1

## IntelleQ Academy - Domain Focus Assessment

### Task Overview
Create a standalone JavaScript module that:
1. ✅ Fetches data from a public API using **async/await**
2. ✅ Processes data using **ES6 array methods** (map, filter, reduce)
3. ✅ Renders result into a **basic React component structure**

---

## Project Structure

```
weekly-proficiency-task/
├── dataModule.js       # Standalone module for API & data processing
├── UserCard.jsx        # React component for individual user
├── UserList.jsx        # Main container component
├── App.jsx             # Root app component
├── styles.css          # Component styles
└── README.md           # This file
```

---

## Key Features Demonstrated

### 1. Async/Await Pattern
```javascript
export const fetchUsers = async () => {
  const response = await fetch(API_URL);
  const users = await response.json();
  return users;
};
```

### 2. ES6 Array Methods

**Filter**: Get users with specific email domains
```javascript
const filteredUsers = users.filter(user => 
  user.email.endsWith('.com') || user.email.endsWith('.net')
);
```

**Map**: Transform to simplified objects
```javascript
const simplifiedUsers = filteredUsers.map(user => ({
  id: user.id,
  name: user.name,
  email: user.email,
  // ... more fields
}));
```

**Reduce**: Group users by city
```javascript
const usersByCity = simplifiedUsers.reduce((acc, user) => {
  if (!acc[user.city]) acc[user.city] = [];
  acc[user.city].push(user);
  return acc;
}, {});
```

### 3. React Component Structure

- **Declarative UI**: Components describe what to render
- **Props**: Data passed from parent to child
- **State Management**: Using useState and useEffect hooks
- **Conditional Rendering**: Loading, error, and empty states

---

## Architecture Highlights

### Imperative → Declarative Transition

**Before (Imperative DOM)**:
```javascript
const div = document.createElement('div');
div.className = 'user-card';
div.innerHTML = `<h3>${user.name}</h3>`;
document.body.appendChild(div);
```

**After (Declarative React)**:
```jsx
<UserCard user={user} />
```

### Component Composition
```
App
└── UserList
    ├── Header
    ├── Filters
    └── UserCard (multiple)
```

---

## Running the Project

### Option 1: With Vite (Recommended)
```bash
npm create vite@latest . -- --template react
npm install
npm run dev
```

### Option 2: With Create React App
```bash
npx create-react-app .
npm start
```

### Option 3: Standalone Module Testing
Open browser console and test the data module:
```javascript
import { getUserData } from './dataModule.js';
const data = await getUserData();
console.log(data);
```

---

## Learning Outcomes

By completing this task, you've demonstrated:

1. ✅ **Modern JavaScript**: async/await, ES6+ syntax
2. ✅ **Functional Programming**: map, filter, reduce
3. ✅ **React Fundamentals**: Components, props, state, hooks
4. ✅ **API Integration**: Fetch, error handling, loading states
5. ✅ **Declarative Thinking**: UI as a function of state

---

## API Used
- **JSONPlaceholder**: https://jsonplaceholder.typicode.com/users
- Free fake API for testing and prototyping

---

## Next Steps

- Add search functionality
- Implement sorting options
- Add pagination
- Create detail view for each user
- Add form to create new users (POST request)

---

**IntelleQ Academy** - Week 1 Proficiency Task Complete! 🎉
