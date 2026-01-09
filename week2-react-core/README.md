# Week 2: React Core — Components & Data Flow

## IntelleQ Academy Internship Project

### Domain Focus
Mastering one-way data flow, handling local component state, and managing side effects (API calls/subscriptions) within the React lifecycle.

### Weekly Proficiency Task
Develop a set of interactive React components that demonstrate parent-child communication via props, form input handling using `useState`, and automatic data refreshing using `useEffect`.

---

## Project Structure

```
week2-react-core/
├── session4-components-props/
│   ├── lab-reusable-ui-cards/      # Creating reusable UI cards for dynamic data
│   └── task-dynamic-card/          # Implement a dynamic "Card" component
├── session5-state-management/
│   ├── lab-form-validation/        # Building a form with validation
│   └── task-interactive-form/      # Create an interactive input form with state handling
├── session6-side-effects/
│   ├── lab-mock-api/               # Connecting a component to a mock API
│   └── task-live-data-widget/      # Build a live data widget (Timer/News Feed)
├── weekly-proficiency-task/        # ⭐ MAIN ASSESSMENT TASK
│   ├── components/
│   │   ├── UserProfile.jsx         # Parent component with state
│   │   ├── ProfileCard.jsx         # Child component receiving props
│   │   └── ContactForm.jsx         # Form with useState handling
│   ├── hooks/
│   │   └── useDataFetch.js         # Custom hook for API calls
│   └── App.jsx                     # Root component demonstrating data flow
└── README.md
```

---

## Session 4: Components & Props

### Topics Covered
- Functional Components
- Props & Prop Drilling
- Conditional Rendering

### Tasks
- **Lab**: Creating reusable UI cards for dynamic data
- **Task**: Implement a dynamic "Card" component

---

## Session 5: State Management (Basic)

### Topics Covered
- useState Hook fundamentals
- Handling Events in React
- Forms & Controlled Components

### Tasks
- **Lab**: Building a form with validation
- **Task**: Create an interactive input form with state handling

---

## Session 6: Side Effects & Lifecycle

### Topics Covered
- useEffect Hook mechanics
- API Integration in React & Dependency Arrays & Cleanup

### Tasks
- **Lab**: Connecting a component to a mock API
- **Task**: Build a live data widget (e.g., Timer/News Feed)

---

## Weekly Proficiency Task Features

### ✅ Parent-Child Communication
- UserProfile (parent) passes data to ProfileCard (child)
- Props drilling demonstration
- State lifting patterns

### ✅ Form Input Handling with useState
- Controlled components
- Real-time validation
- Form submission handling

### ✅ Automatic Data Refreshing with useEffect
- API calls on component mount
- Dependency array usage
- Cleanup functions

---

## Getting Started

```bash
# Navigate to Week 2 project
cd week2-react-core

# Install dependencies for any session
cd session4-components-props/lab-reusable-ui-cards
npm install
npm run dev

# Or run the main proficiency task
cd weekly-proficiency-task
npm install
npm run dev
```

---

## Learning Outcomes

By the end of Week 2, you will master:
- ✅ Component composition and reusability
- ✅ Props passing and prop drilling
- ✅ State management with useState
- ✅ Event handling in React
- ✅ Side effects with useEffect
- ✅ API integration patterns
- ✅ Component lifecycle understanding

---

**IntelleQ Academy** - Week 2: React Core Mastery 🚀