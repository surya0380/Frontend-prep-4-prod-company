/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce(func, wait) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}

// straight polyfill no changes required

// edge cases:
//1. what if the function throws an error?

// Current debounce doesn't handle errors
const buggyFunc = () => {
    throw new Error("Something broke!");
};

const debouncedFunc = debounce(buggyFunc, 1000);
debouncedFunc(); // Error will crash silently in setTimeout
// Issue: The error breaks silently and stops future debounce calls.

// Solution: Wrap in try-catch:
timer = setTimeout(() => {
    try {
        func.apply(this, args);
    } catch (error) {
        console.error("Error in debounced function:", error);
    }
}, wait);

// 2. User removes the element before debounce fires
// User types in search → debounce starts timer (1000ms)
// User navigates away → element deleted before callback fires
// callback still tries to run → memory leak or error

const debouncedSearch1 = debounce((query) => {
    fetch(`/api/search?q=${query}`); // Element is gone, API call still fires!
}, 1000);
// Issue: Memory leak - callback executes even after the element / component is destroyed.

// Solution: Add a way to cancel:
function debounce(func, wait) {
    let timer;

    function debounced(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    }

    debounced.cancel = () => clearTimeout(timer); // Cancel method
    return debounced;
}

// Usage:
const debouncedSearch = debounce(handleSearch, 1000);
debouncedSearch('test');
debouncedSearch.cancel(); // Cancel before cleanup


// How to spot edge cases in interviews:
// Think about errors → Will it break?
// Think about cleanup → What if element is removed ?
// Think about edge values → What if delay is 0 or negative ?
// Think about context → Does this work correctly ?
// Think about cancellation → Can user stop it ?