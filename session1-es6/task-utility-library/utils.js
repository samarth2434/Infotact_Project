// Modular JavaScript Utility Library

// String utilities
export const stringUtils = {
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  
  reverse: (str) => str.split('').reverse().join(''),
  
  truncate: (str, length) => 
    str.length > length ? `${str.substring(0, length)}...` : str,
  
  slugify: (str) => 
    str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
};

// Array utilities
export const arrayUtils = {
  unique: (arr) => [...new Set(arr)],
  
  chunk: (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },
  
  flatten: (arr) => arr.flat(Infinity),
  
  shuffle: (arr) => [...arr].sort(() => Math.random() - 0.5)
};

// Object utilities
export const objectUtils = {
  pick: (obj, keys) => 
    keys.reduce((acc, key) => {
      if (obj.hasOwnProperty(key)) acc[key] = obj[key];
      return acc;
    }, {}),
  
  omit: (obj, keys) => 
    Object.keys(obj)
      .filter(key => !keys.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {}),
  
  deepClone: (obj) => JSON.parse(JSON.stringify(obj))
};

// Number utilities
export const numberUtils = {
  random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  
  clamp: (num, min, max) => Math.min(Math.max(num, min), max),
  
  isEven: (num) => num % 2 === 0,
  
  sum: (...numbers) => numbers.reduce((acc, num) => acc + num, 0)
};

// Default export with all utilities
export default {
  string: stringUtils,
  array: arrayUtils,
  object: objectUtils,
  number: numberUtils
};
