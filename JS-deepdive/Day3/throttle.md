## Throttling
- throttle is a mechanism that limits an event handler, even when the event is triggered  by a user, this is commmonly seen in button clics, browser resizing, and scrolling events.

```javascript
function myThrottle(func, delay){
    let lastCall = 0
    
    return function(...args){
        let now = new Date().getTime();
        
        if(now-lastCall >= delay){
            lastCall = now;
            func.apply(this, args)
        }
    }
}
```

**another approach** --> use this approach only

```javascript
function myThrottle(func, delay){
    let flag = true;

    return function(...args){
        if(flag){
            func.apply(this, args);
                flag = false;
                setTimeout(() => {
                    flag = true;
                }, delay)
            )
        }
    }
}

```
ex:

const myFunc = () => console.log("resizing")

window.addEventListener("resize", myFunc) // this will trigger on every pixel change 10000 times

now with throttle:
const throtFunc = myThrottle(myFunc, 300)

window.addEventListener("resize", throtFunc) // this will trigger at most every 300ms, even if the user is resizing continuously
```

## miscellanous

1. Debounce vs Throttle
- Debounce: Waits until you stop doing something, then executes once.
Example: You type in a search box, it waits 1 second after you stop typing, then searches.

- Throttle: Executes at a regular interval no matter what.
Example: While scrolling, it checks every 300ms if you crossed a threshold, not on every single pixel moved.

2. When to Use Each
Use Debounce when:
You wait for the final result after user stops
* Typing in a search box
* Window resizing
* Saving form data

Use Throttle when:
You need consistent checks even while something is happening
* Scrolling (check scroll position every 300ms)
* Button clicks (ignore extra clicks within 1 second)
* Drag events (update position every 100ms, not every pixel)

3. Which is Better for Search Input? -> DEBOUNCE
Why? Because you want to wait until the user finishes typing before making an API call
```
User types: j > a > v > a > script
                    - (user stops)
            Wait 500ms... then 1 API call
```

4. Which is Better for Scroll Event? → THROTTLE
Why? Because you want consistent updates as they scroll (like loading more content or showing a scroll-to-top button).
```
User scrolling continuously
> Check every 300ms < Throttle
> Update UI
> Check every 300ms
(This feels smooth, not laggy)
```

## Quick Memory Trick:
Debounce = Wait for silence (search input)
Throttle = Heartbeat pattern (scroll/resize)

sources: https://www.youtube.com/watch?v=81NGEXAaa3Y