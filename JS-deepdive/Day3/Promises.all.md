## Promise.All()

- is a mecahnism that accepts an array of promises and return results when all resolves

**approach used here is not just byhearting a polfill but writing a function to logically handle an array of promises**

```javascript
function promiseAll(promises) {
  // Step 1: Return a new promise (because we need to return something eventually)
  return new Promise((resolve, reject) => {
    // Step 2: Handle edge case - empty array
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    // Step 3: track each resolved promise
    const results = [];
    let resolvedCount = 0;

    // Step 4: iterate through each promise
    promises.forEach((promise, index) => {
      // Step 5: wait and complete each prom
      promise
        .then((result) => {
          // Store each promise's result at result's each location
          results[index] = result;

          // increase counter after each prom completion
          resolvedCount++;

          // Check if all are done
          if (resolvedCount === promises.length) {
            resolve(results); // Return all results!
          }
        })
        .catch((error) => {
          // If ANY promise fails, reject immediately
          reject(error);
        });
    });
  });
}
```

```
example:
const results = promiseAll([new Promise.then(() => console.log("hello)), Promise.resolve(2)])
console.log(results) // [hello, 2]
```

## Resource

https://www.youtube.com/watch?v=DlTVt1rZjIo
