## Deep Clone / Deep copy

- Deep clone creates a completely independent copy of an object, including all nested objects and arrays, so changes to the copy don't affect the original.

### Simple Example

```javascript
// Before deep clone
const original = {
  name: "John",
  address: { city: "NYC", zip: 10001 },
};

const copy = original; // copying reference of the object
copy.address.city = "LA";

console.log(original.address.city); // original changed, shallow copy problem

// With deep clone
const deepCopy = deepClone(original); // using deepclone to create a independent object of original
deepCopy.address.city = "LA";

console.log(original.address.city); // "NYC" - ORIGINAL UNCHANGED (this is what we want)
```

**Key Difference:**

- **Shallow copy** means you only copy the top level - nested objects are still references
- **Deep clone** means you copy everything, including all the nested objects and arrays inside

### Real World Use Case: Undo Functionality

```javascript
const previousState = deepClone(noteState); // Save before editing
noteState.content = "new text"; // User edits
noteState = deepClone(previousState); // Undo - restore original
```

Without deep clone, undo wouldn't work because both variables would reference the same object.

**Key points**
Why this matters:

- Tests recursion
- Tests object handling
- Tests edge cases
- Used in real apps (state cloning)

## Polyfill

```javascript
function myDeepClone(obj) {
  // do a null check primarily and if not null and not an object then return the value in below example, return name as john thats all
  if (obj === null || typeof obj !== "object") return obj;

  // Step 1: Create empty container (array or object)
  let copyObj = Array.isArray(obj) ? [] : {};

  // Step 2: Loop through each property in the original object
  for (let key in obj) {
    // If the value is an object, this function calls itself make reccursion
    // If the value is a value, it just returns the value
    copyObj[key] = myDeepClone(obj[key]);
  }

  // Step 3: Return the fully cloned independent copy
  return copyObj;
}
```

### Example with Trace Journey

```javascript
const user = {
  name: "John",
  address: { city: "NYC" },
};

const cloned = myDeepClone(user);

cloned.address.city = "LA";
console.log(user.address.city); // "NYC" - Original unchanged
```

**Interview Answer:**
"The function recursively goes through each property. If it finds a primitive (like a string or number), it copies it directly. If it finds an object or array, it calls itself recursively to clone that nested object too. This way, every level gets cloned."

## Part 2: Edge Cases

### 1. What about Date?

- Date is an object but not a plain object, so cloning it normally creates an empty object instead of a date.

**Problem:**

```javascript
const obj = { createdAt: new Date("2024-01-01") };
const cloned = myDeepClone(obj);

console.log(cloned.createdAt); // {} (empty object, not a date)
```

**Solution - Check for Date and handle separately:**

```javascript
function myDeepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  // Handle Date,
  // if obj is an instance of Date // hint to remember
  if (obj instanceof Date) {
    return new Date(obj.getTime()); // Create new date with same timestamp
  }

  let copyObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    copyObj[key] = myDeepClone(obj[key]);
  }
  return copyObj;
}

// Now it works
const cloned = myDeepClone(obj);
console.log(cloned.createdAt); // Date object properly cloned
```

### 2. What about Functions?

**One-liner:** Functions should be shared by reference (not cloned), because cloning a function doesn't make practical sense.

**Problem:**

```javascript
const obj = {
  name: "John",
  greet: function () {
    return "Hello";
  },
};
const cloned = myDeepClone(obj);

console.log(cloned.greet); // {} (becomes empty object)
```

**Solution - Just keep the reference:**

```javascript
function myDeepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  // Handle functions - just return the reference
  if (typeof obj === "function") {
    return obj; // Share the same function
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  let copyObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    copyObj[key] = myDeepClone(obj[key]);
  }
  return copyObj;
}

// Now functions are preserved
const cloned = myDeepClone(obj);
console.log(cloned.greet()); // "Hello" - function works
```

### 3. What about Circular References? (IMPORTANT) (REVISIT AND PRACTICE THIS AGAIN!!!)

**One-liner:** If an object references itself, the recursion goes infinite and crashes, so you need to track what you've already cloned.

**Problem:**

```javascript
const obj = { name: "John" };
obj.self = obj; // Object references itself

const cloned = myDeepClone(obj); // Stack overflow - infinite recursion!
```

**Solution - Use a Map to track cloned objects:**

```javascript
function myDeepClone(obj, map = new Map()) {
  if (obj === null || typeof obj !== "object") return obj;

  // If we've already cloned this exact object, return the clone (not original)
  // use "memoization" trick here to see if we already have the value in our map
  if (map.has(obj)) {
    return map.get(obj); // Return previously cloned version
  }

  if (typeof obj === "function") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  let copyObj = Array.isArray(obj) ? [] : {};

  // BEFORE recursing, mark this object as being cloned
  map.set(obj, copyObj); // Store the reference

  for (let key in obj) {
    copyObj[key] = myDeepClone(obj[key], map); // Pass map to recursive calls
  }

  return copyObj;
}

// Now it handles circular references
const obj = { name: "John" };
obj.self = obj;

const cloned = myDeepClone(obj);
console.log(cloned.self === cloned); // true - self references the clone, not original
console.log(cloned.self.self === cloned); // true - still works at any depth
```

**How the Map prevents infinite recursion:**

- First time we see `obj`, we store it in the map: `map.set(obj, copyObj)`
- If we encounter `obj` again during recursion, `map.has(obj)` returns true
- We return the already-created clone instead of recursing again, preventing the infinite loop
