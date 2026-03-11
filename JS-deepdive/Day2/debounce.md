# Javascript Debounce

A debounce is a function that delays executing another function until a certain amount of time passes without that function being called again.

```javascript
function debounce(func, delay){
    let timer;

    return function(...args){
        console.log("input typing...")
        clearTimeout(timer);

        timer = setTimeout(()  => {
            console.log("Debounce triggered! Executing function")
            func.apply(this, args)
        }, delay)
    }
}
```

## Example: Search on Input

```javascript
// Example: Search on input
const handleSearch = (query) => {
  console.log(' API Call: Searching for:', query);
};

const debouncedSearch = debounce(handleSearch, 1000);

// Simulate typing
console.log('--- User typing "javascript" ---');
debouncedSearch('jav');      // Timer reset
debouncedSearch('java');     // Timer reset
debouncedSearch('javascript'); // Final search after 1 second

// Output:
// --- User typing "javascript" ---
// input typing...
// input typing...
// input typing...
// (1 second pause)
// Debounce triggered! Executing function
// 🔍 API Call: Searching for: javascript
```

## Key Points

- Without debounce: 5 API calls (one per keystroke) 
- With debounce: 1 API call (after user stops typing) 
- Real use cases: Search, autocomplete, resize listeners, form validation

## Why Debounce Improves Performance

Debounce prevents firing expensive operations (API calls, DOM updates, calculations) multiple times. Instead of executing on every keystroke, it waits until the user stops, so you do less work.

## Debounce vs Throttle

**Debounce:** Execute after user STOPS (wait for silence) → Good for search, autocomplete

**Throttle:** Execute every X milliseconds even if user keeps going → Good for scroll, resize events

## Quick Reference

- **Debounce** = "Wait until they're done typing"
- **Throttle** = "Execute every second even if they keep going"

## Real time Example

```javascript
// User typing "javascript"
// Without debounce: 10 API calls (one per letter) 
// With debounce: 1 API call (after user stops) 

const debouncedSearch = debounce((query) => {
  fetch(`/api/search?q=${query}`); // Expensive API call
}, 500);

// Every keystroke calls debouncedSearch, but execution happens after 500ms of silence
```

## Resources

- See GFE debounce as well