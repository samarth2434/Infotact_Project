# Week 3: Advanced React — Routing & State

## IntelleQ Academy Internship Project

### Domain Focus
Advanced React patterns including client-side routing, global state management, and performance optimization with custom hooks.

### Weekly Proficiency Task
Build a complete SPA with React Router, Context API for global state, and custom hooks for data fetching and performance optimization.

---

## Project Structure

```
week3-advanced-react/
├── session7-react-router/
│   ├── lab-client-navigation/        # Implementing client-side navigation
│   └── task-multi-page-layout/       # Create a multi-page layout with sidebar
├── session8-global-state/
│   ├── lab-theme-context/            # Setting up Theme Context (Dark/Light)
│   └── task-user-authentication/     # Implement global state for User Authentication
├── session9-advanced-hooks/
│   ├── lab-performance-optimization/ # Optimizing heavy lists with useMemo
│   └── task-custom-fetch-hook/       # Build a custom useFetch hook
├── weekly-proficiency-task/          # ⭐ MAIN ASSESSMENT TASK
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/               # App layout with routing
│   │   │   ├── Auth/                 # Authentication components
│   │   │   └── Dashboard/            # Dashboard components
│   │   ├── contexts/
│   │   │   ├── AuthContext.js        # Global auth state
│   │   │   └── ThemeContext.js       # Theme management
│   │   ├── hooks/
│   │   │   ├── useFetch.js           # Custom data fetching hook
│   │   │   └── useLocalStorage.js    # Local storage hook
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Home page
│   │   │   ├── Dashboard.jsx         # Protected dashboard
│   │   │   └── Profile.jsx           # User profile
│   │   └── App.jsx                   # Root with routing setup
└── README.md
```

---

## Session 7: React Router (SPA)

### Topics Covered
- React Router v6+ setup
- Nested Routes & Layouts
- useNavigate, useParams

### Tasks
- **Lab**: Implementing client-side navigation
- **Task**: Create a multi-page layout with sidebar

---

## Session 8: Global State Management

### Topics Covered
- Limitations of Prop Drilling
- Context API & useContext
- Introduction to Redux Toolkit (Slices)

### Tasks
- **Lab**: Setting up Theme Context (Dark/Light)
- **Task**: Implement global state for User Authentication

---

## Session 9: Advanced Hooks & UI

### Topics Covered
- useReducer, useMemo, useCallback
- Custom Hooks
- Performance optimization patterns

### Tasks
- **Lab**: Optimizing heavy lists with useMemo
- **Task**: Build a custom useFetch hook

---

## Weekly Proficiency Task Features

### ✅ React Router Implementation
- Multi-page SPA with nested routing
- Protected routes with authentication
- Dynamic navigation with useNavigate

### ✅ Global State with Context API
- Theme switching (Dark/Light mode)
- User authentication state
- Shopping cart or user preferences

### ✅ Custom Hooks & Performance
- Custom useFetch hook for API calls
- useMemo for expensive calculations
- useCallback for event handlers

---

## Getting Started

```bash
# Navigate to Week 3 project
cd week3-advanced-react

# Install dependencies for any session
cd session7-react-router/lab-client-navigation
npm install
npm run dev

# Or run the main proficiency task
cd weekly-proficiency-task
npm install
npm run dev
```

---

## Learning Outcomes

By the end of Week 3, you will master:
- ✅ React Router for SPA navigation
- ✅ Global state management with Context API
- ✅ Advanced hooks (useReducer, useMemo, useCallback)
- ✅ Custom hooks development
- ✅ Performance optimization techniques
- ✅ Protected routes and authentication flows
- ✅ Theme management and user preferences

---

**IntelleQ Academy** - Week 3: Advanced React Mastery 🚀