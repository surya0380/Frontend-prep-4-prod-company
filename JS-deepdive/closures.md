what are closures?
    - the inner function has access to the variables of the outer function, even after the outer function has finished executing

    //simple example for closure
    example:
        function welcome(name){
            let message = function(greet){
                console.log(name+" "+greet)
            }
            return message;
        }

        let greet = welcome("John");
        greet("Hello"); // Output: John Hello


    example 2: 
        function counter(){
            let count = 0;

            return {
                increment: () => {
                    count++;
                    console.log("increment count: ", count);
                },
                decrement: () => {
                    count--;
                    console.log("decrement count: ", count);
                },
                getCount: () => {
                    console.log("current count: ", count);
                }
            }
        }

        let myCounter = counter();
        myCounter.increment(); //o/p: inc count: 1
        myCounter.increment(); //o/p: inc count: 2
        myCounter.decrement(); //o/p: dec count: 1
        myCounter.getCount(); //o/p: current count: 1

        let myCounter2 = counter();
        myCounter2.increment(); //output: inc count 1: which is indpendent of mycounter


    example 3: using a private variable
        function createPass(pass){
            return {
                getPass: () => {
                    console.log(pass);
                }
            }
        }

        let myPass = createPass("surya@123");
        myPass.getPass(); // o/p: surya@123


    example 4: fixing loop variable issue
        for (var i = 1; i <= 3; i++) {
            setTimeout(function() {
                console.log(i);
            }, 1000);
        }
        // Output: 4, 4, 4 (all print 4!)

        // Solution with let
        for (let i = 1; i <= 3; i++) {
            setTimeout(function() {
                console.log(i);
            }, 1000);
        }

        //if we dont want to use let and fix it with var then use IIFE (Immediately Invoked Function Expression)
        for (var i = 1; i <= 3; i++) {
            (function(j) {
                setTimeout(function() {
                    console.log(j);
                }, 1000);
            })(i);
        }

    
where do you think we commonly use closures in our daily day to day react projects commonly?
- 1. useState setter with previous state
        const [count, setCount] = useState(0);

        const increment = () => {
            setCount(prev => prev + 1);  // callback closes over 'prev'
        };
- 2. useEffect with dependencies
        function SearchComponent({ query }) {
            useEffect(() => {
                fetchData(query);  // closure captures 'query'
            }, [query]);
        }



miscelanous questions:
1. Can closures lead to memory leaks?
    - Yes, if not used carefully, closures can lead to memory leaks by keeping references to variables that are no longer needed.
2. Why closure retains memory?
    - Simple answer: Because the outer function's variables are still being used by the inner function.
    ex:
        function createPass(pass){  // pass variable is created
            return {
                getPass: () => {
                    console.log(pass);  // ← still referencing 'pass'!
                }
            }
        }
3. Where is that memory stored?
    - In the Heap (not the Stack)

        Stack vs Heap comparison:

        Stack: Local variables in regular functions (deleted when function ends)
        Heap: Variables captured by closures (persist as long as closure exists)
        Visual:
            function counter(){          // Stack frame created
                let count = 0;           // 'count' initial: Stack
                                        // But closure needs it → moves to Heap
                return {
                    increment: () => {
                        count++;         // ← references 'count' in Heap
                    }
                }
            }

        The count variable moves to the Heap because a closure is holding onto it.
4. When is it garbage collected?
    - When the closure is no longer referenced anywhere

        Example: 
            let myCounter = counter();
            myCounter.increment();  // closure active, memory retained

            myCounter = null;       // ← no reference to closure anymore
            // Now garbage collector will clean up the 'count' variable
5. What happens in memory during execution context creation?
    ex:
        function createPass(pass){              // 1. Execution context created
            return {                            // 2. return object created
                getPass: () => {
                    console.log(pass);
                }
            }
        }

        let myPass = createPass("surya@123");   // 3. Function called


    What happens in memory:

    Step	                                What Happens	                                               Memory Location
    1️⃣ Call	                createPass() execution context created	                                        Stack
    2️⃣ Scope Creation	        A Closure Scope is formed linking to outer function's variables	                Heap
    3️⃣ Variable Capture	    pass parameter is marked as "needed by closure"	                           Moves from Stack → Heap
    4️⃣ Return Object	        Object with getPass method is returned (point to closure scope)	                Heap
    5️⃣ Function Ends	        Original execution context destroyed, BUT...	                                Stack freed
    6️⃣ Closure Lives On	    getPass still has reference to pass in Heap	                                Heap (stays alive!)


    Key insight: The Lexical Scope Chain is created and stored. When the function returns, the execution context dies, but the closure scope stays because someone (the returned function) is still holding onto it.
