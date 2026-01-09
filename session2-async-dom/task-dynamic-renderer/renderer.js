// Dynamic List Renderer - Raw JavaScript DOM Manipulation

let items = [];
let currentFilter = 'all';
let nextId = 1;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
  renderItems();
  updateStats();
});

// Add new item
const addItem = () => {
  const input = document.getElementById('item-input');
  const text = input.value.trim();
  
  if (text === '') {
    alert('Please enter a task!');
    return;
  }
  
  const newItem = {
    id: nextId++,
    text: text,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  items.push(newItem);
  input.value = '';
  
  saveToLocalStorage();
  renderItems();
  updateStats();
};

// Handle Enter key press
const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    addItem();
  }
};

// Toggle item completion
const toggleItem = (id) => {
  items = items.map(item => 
    item.id === id ? { ...item, completed: !item.completed } : item
  );
  
  saveToLocalStorage();
  renderItems();
  updateStats();
};

// Delete item
const deleteItem = (id) => {
  items = items.filter(item => item.id !== id);
  
  saveToLocalStorage();
  renderItems();
  updateStats();
};

// Filter items
const filterItems = (filter) => {
  currentFilter = filter;
  
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  renderItems();
};

// Clear completed items
const clearCompleted = () => {
  items = items.filter(item => !item.completed);
  
  saveToLocalStorage();
  renderItems();
  updateStats();
};

// Render items to DOM
const renderItems = () => {
  const listContainer = document.getElementById('item-list');
  const emptyState = document.getElementById('empty-state');
  
  // Filter items based on current filter
  let filteredItems = items;
  if (currentFilter === 'active') {
    filteredItems = items.filter(item => !item.completed);
  } else if (currentFilter === 'completed') {
    filteredItems = items.filter(item => item.completed);
  }
  
  // Show empty state if no items
  if (filteredItems.length === 0) {
    listContainer.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';
  
  // Render items
  listContainer.innerHTML = filteredItems.map(item => `
    <li class="list-item ${item.completed ? 'completed' : ''}">
      <input 
        type="checkbox" 
        class="checkbox" 
        ${item.completed ? 'checked' : ''}
        onchange="toggleItem(${item.id})"
      >
      <span class="item-text">${item.text}</span>
      <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
    </li>
  `).join('');
};

// Update statistics
const updateStats = () => {
  const total = items.length;
  const active = items.filter(item => !item.completed).length;
  const completed = items.filter(item => item.completed).length;
  
  document.getElementById('total-count').textContent = total;
  document.getElementById('active-count').textContent = active;
  document.getElementById('completed-count').textContent = completed;
};

// Local Storage functions
const saveToLocalStorage = () => {
  localStorage.setItem('todoItems', JSON.stringify(items));
  localStorage.setItem('nextId', nextId);
};

const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('todoItems');
  const savedId = localStorage.getItem('nextId');
  
  if (saved) {
    items = JSON.parse(saved);
  }
  
  if (savedId) {
    nextId = parseInt(savedId);
  }
};
