// Refactored ES6+ Code

// Let/Const declarations
const name = 'John';
const age = 25;
const city = 'Mumbai';

// Arrow function
const greet = (name) => `Hello, ${name}!`;

// Object shorthand & destructuring
const user = { name, age, city };

// Array methods with arrow functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);

// Promise instead of callback
const fetchUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Alice', age: 30 });
    }, 1000);
  });
};

// Template literals & destructuring
const getUserInfo = ({ name, age, city }) => 
  `Name: ${name}, Age: ${age}, City: ${city}`;

// ES6 Module export
export { greet, fetchUser, getUserInfo };
