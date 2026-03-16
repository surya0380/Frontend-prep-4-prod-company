## Currying

Currying is a technique where you convert a function that takes **multiple arguments** into a chain of functions that each take one argument.

### Basic Example

```javascript
function add(a, b){
    return a + b;
}

add(2, 3) // 5
```

**Curried Version:**

```javascript
function curry(a){
    return function(b){
        return a + b;
    }
}

curry(2)(3) // 5
```

### Why Use It?

- Reuse functions with some arguments fixed
- Function composition
- Makes testing easier

---

## Why Currying is Useful

Sometimes you want to create specialized versions of a function without rewriting the whole thing.

### Example: Without Currying

```javascript
function multiply(a, b) {
  return a * b;
}

// Want to multiply by 2? You have to pass it every time
multiply(5, 2); // 10
multiply(10, 2);  // 20
multiply(100, 2); // 200
```

### Example: With Currying

```javascript
function curriedMultiply(a) {
  return function(b) {
    return a * b;
  }
}

// Create a specialized function once
const multiplyBy2 = curriedMultiply(2);

// Now reuse it everywhere
multiplyBy2(5);   // 10
multiplyBy2(10);  // 20
multiplyBy2(100); // 200
```

### Key Benefits

- **Reusability:** Create specialized functions from general ones
- **Cleaner code:** Don't repeat the same arguments
- **Function composition:** Chain functions together easily
- **Partial application:** Pre-fill some arguments, use later

---

## How Lodash Uses Currying

Lodash is a utility library that heavily uses currying to make functions flexible and composable.

### Basic Example

```javascript
const _ = require('lodash');

// Regular approach
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

// With curried lodash functions
const multiply = (a, b) => a * b;

// Curry gives you partial application
const multiplyBy2 = _.curry(multiply)(2);
const doubled = numbers.map(multiplyBy2);
```

### Real Life Example

```javascript
const users = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
  { name: 'Bob', age: 25 }
];

// Without currying - repetitive
users.filter(u => u.age === 25);

// With lodash currying - clean & reusable
const filterByAge = _.curry(_.filter);
const filterAge25 = filterByAge(users)(obj => obj.age === 25);

// Or even better:
const getAge25 = _.filter(users, user => user.age === 25);
```

---

## Currying Problem Example

```javascript
function add(a){
    return b => {
        return b ? a + b : a;
    }
}

console.log(add(2)(3)) // 5
console.log(add(2)()) // 2
```