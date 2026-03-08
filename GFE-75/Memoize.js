// question memoize

//proposed solution with traditional caching techinique
function memoize(func) {
    let cache = {};

    return function (args) {
        if (args in cache) {
            return cache[args];
        } else {
            let result = func(args);
            cache[args] = result;
            return result;
        }
    }
}

// test case failed for
// memoize › differentiates strings and numbers
// expect(count).toBe(1);
// 69 | expect(memoizedFn('1')).toBe('1');
// 70 | expect(count).toBe(1);
// > 71 | expect(memoizedFn(1)).toBe(1);
//      |                           ^
//     72 | expect(count).toBe(2);
// 73 | expect(memoizedFn(1)).toBe(1);
// 74 | expect(count).toBe(2);

// memoize › can access`this`
// TypeError: Cannot read properties of undefined(reading 'age')

// 78 | let count = 0;
// 79 | function mul(this: any, x: number) {
//     80 | count++;
// > 81 |       return this.age * x;
//     82 |     }
// 83 |     const person = {
//     84 | age: 42,

// updated:
function memoize(func) {
    let cache = new Map();

    return function (args) {
        if (cache.has(args)) {
            return cache.get(args);
        } else {
            const result = func.apply(this, args);
            cache.set(args, result);
            return result;
        }
    }
}

// Key changes:
// * new Map() instead of { } - Maps preserve type distinction between "1" and 1
// * fn.call(this, arg) instead of fn(arg) - Preserves the this context when the memoized function is called as a method(e.g., person.memoizedFn(1))