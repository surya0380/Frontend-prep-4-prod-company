## Understand and explain:

## Call Stack

**A** It's the order in which functions are executed - like a to-do list where you mark off the last task first.

**The example (memorize this):**

```javascript
function first() {
  second();
  console.log("First");
}

function second() {
  third();
  console.log("Second");
}

function third() {
  console.log("Third");
}

first();
```

**What gets printed:**
```
Third
Second
First
```

**How the call stack works (step by step):**
```
Step 1: first() called → Stack: [first]
Step 2: second() called → Stack: [first, second]
Step 3: third() called → Stack: [first, second, third]
Step 4: third() finishes, prints "Third" → Stack: [first, second]
Step 5: second() finishes, prints "Second" → Stack: [first]
Step 6: first() finishes, prints "First" → Stack: []
```

## Web APIs

**A:** Web APIs are browser features that handle tasks JavaScript can't do alone - like timers, network requests, or DOM events. JavaScript delegates these to the browser.

**The example (memorize this):**

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Hello from timeout");
}, 1000);

console.log("End");

```
```
Start
End
Hello from timeout
```

```
Step 1: "Start" printed immediately (JavaScript executes it)
Step 2: setTimeout encountered → JavaScript delegates to Browser
        → Browser starts the timer (Web API takes over)
Step 3: "End" printed immediately (JavaScript doesn't wait!)
Step 4: After 1000ms, browser finishes timer → callback returned
Step 5: "Hello from timeout" prints
```
**Interview answer: "Web APIs are browser features outside JavaScript. When JavaScript encounters async operations like setTimeout, fetch, or addEventListener, it hands them to the browser and continues executing the rest of the code. Once the browser finishes the task, it returns the callback to JavaScript to execute."**


## Callback Queue

**A:** A waiting room for callbacks from timers. They sit here until the call stack is completely empty.

**The example (memorize this):**

```javascript
console.log("A");

setTimeout(() => {
  console.log("B"); // callback -> goes to callback queue
}, 0);  // Even 0ms delay!

console.log("C");
```
```
A
C
B
```
Why is B last even though delay is 0?
```
Step 1: "A" printed immediately (sync code in call stack)
Step 2: setTimeout encountered → browser takes timer → callback goes to Callback Queue
Step 3: "C" printed immediately (sync code continues)
Step 4: Call stack is empty → Event loop checks Callback Queue
Step 5: "B" from Callback Queue is executed
```
**Interview answer: "The Callback Queue is where callbacks from setTimeout, setInterval, and other async operations wait. They can only execute when the call stack is completely empty. Even with a 0ms delay, the callback still goes to the queue and must wait."**


## Microtask Queue

**One-liner:** A higher-priority waiting room for Promises. They execute BEFORE setTimeout callbacks, even if setTimeout has 0ms delay.

**The example (memorize this):**

```javascript
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("C");
  });

console.log("D");
```
```
A
D
C
B
```
Why does C come before B?
```Step 1: "A" printed immediately (sync code in call stack)
Step 2: setTimeout encountered → callback goes to Callback Queue
Step 3: Promise encountered → callback goes to Microtask Queue
Step 4: "D" printed immediately (sync code in call stack)
Step 5: Call stack is empty → Event loop checks Microtask Queue FIRST
Step 6: "C" from Microtask Queue is executed
Step 7: Microtask Queue is empty → Event loop checks Callback Queue
Step 8: "B" from Callback Queue is executed
```
What goes in Microtask Queue:

- Promise .then(), .catch(), .finally()
- queueMicrotask()
- MutationObserver

## Event Loop

**One-liner:** The manager that decides which code runs next. It checks: "Is the call stack empty? If yes, what's waiting?" It prioritizes Microtask Queue before Callback Queue.

**The example (memorize this):**

```javascript
console.log("1. Start");

setTimeout(() => {
  console.log("2. Timeout");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("3. Promise");
  })
  .then(() => {
    console.log("4. Promise2");
  });

console.log("5. End");
```
```
1. Start
5. End
3. Promise
4. Promise2
2. Timeout
```

**How the event loop manages this:**
```
Step 1: "1. Start" printed (sync - call stack)

Step 2: setTimeout → callback goes to Callback Queue
        Promise → callback goes to Microtask Queue

Step 3: "5. End" printed (sync - call stack)

Step 4: Call stack is empty → Event loop checks Microtask Queue
        "3. Promise" printed

Step 5: Still in Microtask Queue → "4. Promise2" printed

Step 6: Microtask Queue is empty → Event loop checks Callback Queue
        "2. Timeout" printed

Step 7: Both queues empty → Done!
```
The Event Loop cycle (repeat forever):
```
1. Execute all sync code (call stack)
2. Stack empty? → Drain entire Microtask Queue
3. Microtask empty? → Take ONE task from Callback Queue
4. Go back to step 1
```
Visual priority (highest to lowest):
```
1. Call Stack (Sync code) - EXECUTES FIRST
2. Microtask Queue (Promises) - EXECUTES SECOND
3. Callback Queue (setTimeout, setInterval) - EXECUTES THIRD
```
Key Interview points:
- The Event Loop is the heart of JavaScript's async behavior
- It checks three things in order: call stack → microtask queue → callback queue
- Never leaves microtask queue with pending tasks
- JavaScript is single-threaded, Event Loop ensures fairness


## Miscellaneous Questions

### Why Promise.then() runs before setTimeout

**One line answer:** "Because Promises go to the Microtask Queue which has higher priority than the Callback Queue where setTimeout sits."

---

### Difference between Microtasks vs Macrotasks

**One line answer:** "Microtasks (Promises) have higher priority and execute immediately when the call stack is empty. Macrotasks (setTimeout) wait until all microtasks are done."

**Simple comparison:**
```
Microtasks:  Promise .then(), queueMicrotask(), MutationObserver
Macrotasks:  setTimeout, setInterval, fetch, DOM events

Priority:    Microtasks > Macrotasks
Execution:   All microtasks run → ONE macrotask runs → All microtasks run → ...
```

---

### Order of execution in async code

**One line answer:** "Sync code → All Promises → All timeouts → Repeat."

**The exact order:**
```
1. All synchronous code (call stack) - FIRST
2. All microtasks (Promise .then) - SECOND  
3. ONE macrotask (setTimeout) - THIRD
4. Go back to step 2 (check for new microtasks)

Example:
console.log("1");              // Step 1 - prints immediately
setTimeout(() => console.log("4"), 0);  // Goes to macrotask queue
Promise.resolve().then(() => console.log("2"));  // Goes to microtask queue
console.log("3");              // Step 1 - prints immediately

Output: 1 → 3 → 2 → 4
```


simple output based questions:
```javascript
1.
console.log("start")

setTimeout(() => {
  console.log("timeout")
}, 0)

Promise.resolve().then(() => {
  console.log("promise")
})

console.log("end")
```
```
output:
start
end
promise
timeout
```
```javascript
2.
console.log("start")

setTimeout(() => {
  console.log("timeout")
}, 0)

async function foo() {
  console.log("foo start")
  await Promise.resolve()
  console.log("foo end")
}

foo();

Promise.resolve().then(() => {
  console.log("promise")
})

console.log("end")
```
```
output:
start
foo start
end
foo end
promise
timeout
```
```
explaination in case of async function:
Call Stack (sync): 1 → 3 → 6
  Output: start, foo start, end

Microtask Queue (in order of creation):
  - foo's continuation (await finished)
  - explicit Promise.then()
  Output: foo end, promise

Callback Queue:
  - setTimeout callback
  Output: timeout
```
