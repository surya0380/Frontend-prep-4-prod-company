what is memoization?
- Memoization is a programming technique which attempts to increase a function’s performance by caching its previously computed results.
    ex:
## basic memoization example
        const memoize = () => {
            let cache = {};

            return (value) => {
                if(value in cache){
                    console.log("fetching from cache")
                    return cache[value]
                }else{
                    console.log("calculating new result")
                    let result = value + 10;
                    cache[value] = result;
                    return result;
                }
            }
        }

        let addition = memoize();
        console.log(addition(10))
        console.log(addition(10))

## Memoization with Multiple Arguments

        const memoize = (fn) => {
            let cache = {};

            return (...args) => {
                const key = JSON.stringify(args);
                
                if(key in cache){
                    console.log("fetching from cache")
                    return cache[key]
                } else {
                    console.log("calculating new result")
                    let result = fn(...args);
                    cache[key] = result;
                    return result;
                }
            }
        }

        const add = (a, b) => a + b;
        const memoizedAdd = memoize(add);
        
        console.log(memoizedAdd(5, 10))  // calculating new result
        console.log(memoizedAdd(5, 10))  // fetching from cache

## Time Complexity Improvement

**Simple Explanation:**

Without memoization:
- Call function(5) → takes 10 seconds
- Call function(5) again → takes 10 seconds again (wastes time)
- **Total: 20 seconds**

With memoization:
- Call function(5) → takes 10 seconds, save result
- Call function(5) again → checks cache, returns instantly (< 1 millisecond)
- **Total: 10 seconds**

**Interview Answer:**
"Memoization trades space (memory) for time (speed). Instead of recomputing the same result, we store it and look it up instantly. Cache lookup is O(1), so repeated calls are free."

**Real Example:**
- Fibonacci without memo: fib(40) = 2+ seconds (repeats calculations millions of times)
- Fibonacci with memo: fib(40) = milliseconds (each number calculated only once)



## Edge Case: Object Arguments - WHY THEY DON'T WORK ---------------> *REVISIT THIS*

**The Problem:**
Objects don't work well with memoization because each new object is treated as different, even if contents are the same.

```javascript
const memoizedFn = memoize((obj) => obj.a + obj.b);

memoizedFn({a: 1, b: 2});  // First time - computes
memoizedFn({a: 1, b: 2});  // Second time - computes AGAIN (not cached!)
```

Why? Each `{}` is a **new object**, so they're different keys. The cache sees them as different inputs.

**Interview Answer:**
"Objects don't cache well because each object is unique. Use memoization with primitives (numbers, strings) instead. If you need objects, pre-convert them to strings first, or redesign to use primitives."

**Simple Rule:**
- Good for memoization: numbers, strings (works)
- Bad for memoization: objects, arrays (fails)


## visit GFE-75's Memoize as well