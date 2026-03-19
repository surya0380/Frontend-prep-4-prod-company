## Deep Clone

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
