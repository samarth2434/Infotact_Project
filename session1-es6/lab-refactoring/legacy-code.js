// Legacy JavaScript Code (ES5) - TO BE REFACTORED

// Old var declarations
var name = 'John';
var age = 25;
var city = 'Mumbai';

// Old function syntax
function greet(name) {
  return 'Hello, ' + name + '!';
}

// Old object creation
var user = {
  name: name,
  age: age,
  city: city
};

// Old array manipulation
var numbers = [1, 2, 3, 4, 5];
var doubled = [];
for (var i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

// Old callback pattern
function fetchUser(callback) {
  setTimeout(function() {
    callback({ name: 'Alice', age: 30 });
  }, 1000);
}

// Old string concatenation
function getUserInfo(user) {
  return 'Name: ' + user.name + ', Age: ' + user.age + ', City: ' + user.city;
}

// Export (CommonJS style)
if (typeof module !== 'undefined') {
  module.exports = { greet, fetchUser, getUserInfo };
}
