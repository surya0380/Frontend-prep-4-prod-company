## Flatten Array

```javascript
function myFlat(arr) {
  let newArr = []; // Container to store flattened results

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      // If item is an array, recursively flatten it and combine results
      newArr = newArr.concat(myFlat(item)); // Capture & combine
    } else {
      // If item is not an array (primitive), just add it
      newArr.push(item);
    }
  });

  return newArr; // Don't forget to return the result
}

console.log(myFlat([1, [1, 2], [[3, 4, 5]]]));
```

### Simple Trace

When looping through `[1, [1, 2], [[3, 4, 5]]]`:

First iteration: item = 1, not an array, so push(1) into newArr
Second iteration: item = [1, 2], is an array, so call myFlat([1, 2]) and concat the result, use concat function so you can capture rest of values as well
Third iteration: item = [[3, 4, 5]], is an array, so recursively flatten and add all numbers

Final result: [1, 1, 2, 3, 4, 5]

### Iterative Approach (Stack-Based) (RE_VISIT!!!!!)

No recursion, use a stack instead:

```javascript
function flatIterative(arr) {
  const stack = [...arr]; // Put all elements in stack
  const result = [];

  while (stack.length) {
    const item = stack.pop(); // Take last item

    if (Array.isArray(item)) {
      stack.push(...item); // If array, spread back into stack
    } else {
      result.unshift(item); // If primitive/value, add to result (at start)
    }
  }

  return result;
}

console.log(flatIterative([1, [1, 2], [[3, 4, 5]]])); // [1, 1, 2, 3, 4, 5]
```

**How it works:** Keep popping items from stack. If it's an array, spread its elements back. If it's a number, add to result. Repeat until stack is empty.

## concat function

When to use concat:

### Example 1: Merging Multiple Arrays

You have user lists from different teams and want to combine them:

```javascript
const teamA = ["Alice", "Bob"];
const teamB = ["Charlie", "David"];

const allUsers = teamA.concat(teamB);
console.log(allUsers); // ["Alice", "Bob", "Charlie", "David"]
```

### Example 2: Flattening One Level (like we did)

You receive nested data from an API and want to combine results:

```javascript
const results = [];
const apiResponses = [
  [1, 2],
  [3, 4],
  [5, 6],
];

apiResponses.forEach((response) => {
  results = results.concat(response); // Combine each response into results
});

console.log(results); // [1, 2, 3, 4, 5, 6]
```
