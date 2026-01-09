// Standalone JavaScript Module - Data Fetching & Processing

const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Fetch users from API using async/await
 * @returns {Promise<Array>} Array of user objects
 */
export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users = await response.json();
    return users;
    
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Process users data using ES6 array methods
 * @param {Array} users - Raw user data from API
 * @returns {Object} Processed data object
 */
export const processUsers = (users) => {
  // Filter: Get only users from specific domains
  const filteredUsers = users.filter(user => 
    user.email.endsWith('.com') || user.email.endsWith('.net')
  );
  
  // Map: Transform to simplified user objects
  const simplifiedUsers = filteredUsers.map(user => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    city: user.address.city,
    company: user.company.name,
    website: user.website
  }));
  
  // Additional processing: Group by city
  const usersByCity = simplifiedUsers.reduce((acc, user) => {
    if (!acc[user.city]) {
      acc[user.city] = [];
    }
    acc[user.city].push(user);
    return acc;
  }, {});
  
  return {
    users: simplifiedUsers,
    totalCount: simplifiedUsers.length,
    cities: Object.keys(usersByCity),
    usersByCity
  };
};

/**
 * Main function to fetch and process data
 * @returns {Promise<Object>} Processed user data
 */
export const getUserData = async () => {
  try {
    const rawUsers = await fetchUsers();
    const processedData = processUsers(rawUsers);
    return processedData;
  } catch (error) {
    console.error('Error in getUserData:', error);
    return null;
  }
};
