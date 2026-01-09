// Fetch API Lab - JSONPlaceholder Integration

const API_BASE = 'https://jsonplaceholder.typicode.com';
const dataContainer = document.getElementById('data-container');
const loading = document.getElementById('loading');

// Show/Hide loading indicator
const setLoading = (isLoading) => {
  loading.style.display = isLoading ? 'block' : 'none';
};

// Clear data container
const clearData = () => {
  dataContainer.innerHTML = '';
};

// Generic fetch function with error handling
const fetchData = async (endpoint) => {
  try {
    setLoading(true);
    clearData();
    
    const response = await fetch(`${API_BASE}/${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    dataContainer.innerHTML = `
      <div class="error">
        ❌ Error: ${error.message}
      </div>
    `;
    console.error('Fetch error:', error);
    return null;
  } finally {
    setLoading(false);
  }
};

// Fetch and display posts
const fetchPosts = async () => {
  const posts = await fetchData('posts?_limit=10');
  
  if (posts) {
    dataContainer.innerHTML = posts.map(post => `
      <div class="card">
        <h3>📝 ${post.title}</h3>
        <p>${post.body}</p>
        <div class="meta">Post ID: ${post.id} | User ID: ${post.userId}</div>
      </div>
    `).join('');
  }
};

// Fetch and display users
const fetchUsers = async () => {
  const users = await fetchData('users');
  
  if (users) {
    dataContainer.innerHTML = users.map(user => `
      <div class="card">
        <h3>👤 ${user.name}</h3>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> ${user.website}</p>
        <div class="meta">
          ${user.address.city}, ${user.address.street}
        </div>
      </div>
    `).join('');
  }
};

// Fetch and display comments
const fetchComments = async () => {
  const comments = await fetchData('comments?_limit=12');
  
  if (comments) {
    dataContainer.innerHTML = comments.map(comment => `
      <div class="card">
        <h3>💬 ${comment.name}</h3>
        <p>${comment.body}</p>
        <div class="meta">
          Email: ${comment.email} | Post ID: ${comment.postId}
        </div>
      </div>
    `).join('');
  }
};

// Fetch and display todos
const fetchTodos = async () => {
  const todos = await fetchData('todos?_limit=15');
  
  if (todos) {
    dataContainer.innerHTML = todos.map(todo => `
      <div class="card">
        <h3>${todo.completed ? '✅' : '⏳'} ${todo.title}</h3>
        <p><strong>Status:</strong> ${todo.completed ? 'Completed' : 'Pending'}</p>
        <div class="meta">Todo ID: ${todo.id} | User ID: ${todo.userId}</div>
      </div>
    `).join('');
  }
};

// Load posts by default
console.log('🚀 Fetch API Lab initialized!');
