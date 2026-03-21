## Event Delegation

- is a technique for listening to events where you delegate a parent element as the listener for all of the events that happen inside it.
  this delegation can be done using ".target" property

ex:

```javascript
const parent = document.querySelector("div");

parent.addEventListener(
  "input",
  function (event) {
    console.log(event.target.value);
  },
  true,
);
```

another example for delegation example of button

```javascript
document.getElementById("parent").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    //delegate event to particular button
    console.log("Button clicked:", e.target.innerText);
  }
});
```

## Interview style questions:

### 1. Event Bubbling

- When you click a child element, the click event travels up through parent elements.

**Example:**

```javascript
// HTML: <div id="parent"><button id="child">Click me</button></div>

const parent = document.getElementById("parent");
const child = document.getElementById("child");

parent.addEventListener("click", () => console.log("Parent clicked"));
child.addEventListener("click", () => console.log("Child clicked"));

// When you click the button:
// Output:
// Child clicked
// Parent clicked (event bubbled up)
```

### 2. Why Delegation Improves Performance

- Instead of adding listeners to 100 buttons, add one listener to the parent and check which button was clicked.

**Example:**

```javascript
// Bad: Add listener to every button
const buttons = document.querySelectorAll("button");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => console.log("Clicked"));
}); // 100 listeners = memory overhead

// Good: One listener on parent
document.getElementById("parent").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    console.log("Clicked");
  }
}); // 1 listener = less memory
```

### 3. Handling Dynamic Elements (RE_VISIT AND READ PROPERLY)!!!!

- If you add new buttons later, old listeners won't work on them, but delegation catches them automatically.

**Example:**

```javascript
// Bad: New buttons won't have listeners
const btn = document.createElement("button");
btn.textContent = "New button";
document.body.appendChild(btn);
// This new button doesn't have a click listener

// Good: Delegation catches all current and future buttons
document.body.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    console.log("Any button clicked, new or old");
  }
});

// Later, when you add a new button:
const newBtn = document.createElement("button");
newBtn.textContent = "I'm new but still works!";
document.body.appendChild(newBtn);
// This new button is automatically handled by the parent listener
```
