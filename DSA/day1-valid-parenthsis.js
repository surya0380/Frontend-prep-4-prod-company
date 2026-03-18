/**
## valid parentheses problem leetcode 20
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {

    const match = {
        ')': '(',
        ']': '[',
        '}': '{'
    }

    let stack = [];

    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char)
        } else if (stack.length === 0 || stack.pop() !== match[char]) {
            return false
        }
    }

    return stack.length === 0;

};

// ## PATTERN: STACK
// trick here is to load stack for each opening parenthesis
// if (, [, { then push to stack,
// how? create a object with key value pair of brackets and do this 
// then pop each time and match it with the object of branckets at line 8, then if it matches then ontinue or else false
// at the end the stack should be empty thats al and it should return true

// ## TIME & SPACE COMPLEXITY
// Time: O(n) - loop through each character once, each operation (push, pop) is O(1)
// Space: O(n) - stack can grow to size of input in worst case (e.g., "(((((" has n opening brackets)
// Rule: Loop through input = O(n) time. Stack grows with input = O(n) space. 