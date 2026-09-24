/* 
 ┌────────────────────────────────────────────────────────┐
 │                   THE BROWSER RUNTIME                  │
 │                                                        │
 │   ┌──────────────────────┐     ┌───────────────────┐   │
 │   │  JAVASCRIPT ENGINE   │     │     WEB APIs      │   │
 │   │                      │     │                   │   │
 │   │  ┌────────────────┐  │     │  • setTimeout()   │   │
 │   │  │   CALL STACK   │  │     │  • fetch() / XHR  │   │
 │   │  │ (Executes code)│  │────>│  • DOM Events     │   │
 │   │  └────────────────┘  │     │                   │   │
 │   │  ┌────────────────┐  │     └─────────┬─────────┘   │
 │   │  │     HEAP       │  │               │             │
 │   │  │ (Memory storage)  │               │             │
 │   │  └────────────────┘  │               │             │
 │   └──────────▲───────────┘               │             │
 │              │                           │             │
 │              │       ┌───────────────┐   │             │
 │              └───────│  EVENT LOOP   │<──┼────────┐    │
 │                      └───────────────┘   │        │    │
 │                                          ▼        │    │
 │       ┌────────────────────────────────────────┐  │    │
 │       │            CALLBACK QUEUES             │  │    │
 │       │                                        │  │    │
 │       │  [ MICROTASK QUEUE ]                   │  │    │
 │       │  • Promises, queueMicrotask()          │──┘    │
 │       │                                        │       │
 │       │  [ MACROTASK QUEUE (Task Queue) ]      │       │
 │       │  • setTimeout, setInterval, UI Events  │───────┘
 │       └────────────────────────────────────────┘       │
 └────────────────────────────────────────────────────────┘
 */

// Event Loop:
   // - CallBack Stack (Function Execution Stack): sync code runs line by line
   // - Web APIs: stores the async tasks(in browser env) outside the call stack
   // - CallBack Queue(Macrotask Queue) / MicroTask Queue(Job Queue):
/*  


CALLBACK STACK (Function Execution Stack) - 
 - "Single-threaded:  JS only has ONE call stack & it can run only one line at a time.
 - "Synchronous code execution":  Code runs from top-bottom. When an function is called, it gets pushed on top of the call stack. Once function returns, it gets popped off.
 - "Stack overflow":  if a function calls itself recursively w/o any base case, it fills up the memory limit of the stack & throw a "RangeError" 
*/

console.log("Global Pushed.");
function third() {
   console.log("Third... Pushed.");
}
function second() {
   console.log("Second.. Pushed.");
   third();
   console.log("Third Popped Off.");
}
function first() {
   console.log("First, Pushed.");
   second();
   console.log("Second Popped Off.");
}
first();
console.log("First Popped Off.");

/*    
WEB APIs: 
   - JS Engine(V8) only handles the (callstack + heap).
   - Web APIs are extra feature provided the browser environment, & they live purely outside the callstack in the browser ev(Web APIs Stack)
   - so whenever JS hit this web apis it immediatley pop them off the callstack & hands them to the (Web APIs Stack).
   - and JS continue running the next line
   - when the background task (timer lapse, fetch finishes, etc). WEB APIs do not execute their callbakcs.
   - Instead they hand the callbacks to the callback-queue/microtask-queue  
*/
console.log("Call Stack: Line 1 executes.");
// pushed & popped off the stack immediately & get handed to the (Web APIs Stack)
setTimeout(() => {
   // once the 2sec passed this callback is moved to the callback queue
   console.log("SetTimeout's Callback executes");
}, 2000);
console.log("Call Stack: Line 2 executes immediately.");

/* 
Microtask(Job Queue) vs Callback(Macrotask) Queue - FIFO
- When the Web APIs finishes their background task, their callback are placed in one of these queue depending on what created it.

1. Microtask(Job Queue):
- callbacks from Promises (.then(), .catch(), .finally()), async/await continuations, and queueMicrotask().
- Priority: HIGH
- Rule: When the callstack is empty, the Event Loop executes EVERY SINGLE microtask in this queue 
until it is 100% empty before touching anything else.

2. Callback Queue (Macrotask Queue)
- callbacks from setTimeout, setInterval, setImmediate, I/O operations, and DOM events (click, scroll).
- Priority: LOW.
- Execution Rule: The Event Loop picks ONLY ONE macrotask from this queue, pushes it to the Call Stack, 
and runs it. Once that single task finishes, it goes back and checks the Microtask Queue again.
*/

console.log("Synchronous: CallStack Start.");

// Macro Task -> goes to Callback queue
setTimeout(() => {
   console.log("MacroTask: setTimeout Callback.")
}, 0);

// Micro Task -> goes to Microtask Queue
Promise.resolve().then(() => {
   console.log("MicroTask: .then #1 Callback.");
})
.then(() => {
   console.log("MicroTask: .then #2 Callback."); // last callback in the microtask
})
console.log("Synchronous: CallStack Ends.");

/* 
EVENT LOOP:
- The Event Loop is a continuously running, single-threaded background process in the JavaScript runtime engine.
 Its sole job is to monitor the Call Stack and the Queues, moving callbacks to the Call Stack when it is ready.

Rules:
Continuous Check Loop: It constantly monitors if the Call Stack is empty (Call Stack === 0 items).
Step 1 — Drain Microtask Queue First:
   -When the Call Stack clears, the Event Loop checks the Microtask Queue.
   -It moves microtasks to the Call Stack one by one until the Microtask Queue is completely empty.
   -If a microtask adds another microtask, it will also run in the same cycle before moving to macrotasks.
Step 2 — Execute ONE Macrotask:
   -Once the Microtask Queue is completely empty, the Event Loop checks the Callback (Macrotask) Queue.
   -It takes ONLY ONE macrotask from the queue and pushes it to the Call Stack to execute.
Step 3 — Repeat Loop:
   -After that single macrotask finishes and pops off the Call Stack, the Event Loop goes back to Step 1 (checking the Microtask Queue again).
*/

function runFullDemo() {
   console.log("       COMPLETE EVENT LOOP FLOW           ");
   console.log("1. [Call Stack] Sync Start");

   // Sent to Web API -> Callback Queue (Macrotask #1)
   setTimeout(() => {
      console.log("5. [Macrotask 1] setTimeout 1 executed");
      // Nested Microtask inside Macrotask
      Promise.resolve().then(() => {
         console.log("6. [Microtask inside Macrotask 1] Runs before Macrotask 2!");
      });
   }, 0);

   // Sent to Web API -> Callback Queue (Macrotask #2)
   setTimeout(() => {
      console.log("7. [Macrotask 2] setTimeout 2 executed");
   }, 0);

   // Sent to Web API -> Microtask Queue (Microtask #1)
   Promise.resolve().then(() => {
      console.log("3. [Microtask 1] Promise .then() 1");
   });

   // Sent to Web API -> Microtask Queue (Microtask #2)
   Promise.resolve().then(() => {
      console.log("4. [Microtask 2] Promise .then() 2");
   });

   console.log("2. [Call Stack] Sync End");
}
setTimeout(runFullDemo, 2000);

// ***NOTE***
// STEP 1: JS sees setTimeout()
// Action: Handed off to Web APIs immediately.
// Web API starts a 0ms timer in a background thread.
// setTimeout pops off the Call Stack right away.
setTimeout(() => { 
   // Macrotask Callback:
   // When 0ms finishes, Web API pushes this callback into the CALLBACK (MACROTASK) QUEUE.
   console.log("Timeout"); 
}, 0);


// STEP 2: JS sees new Promise()
// Action: The executor function inside new Promise() runs SYNCHRONOUSLY on the Call Stack right NOW.
new Promise((resolve) => {
   // 1. Prints immediately to console (Call Stack)
   console.log("Executor"); 
   
   // 2. Marks the Promise as "fulfilled" with the value "Promise Done"
   resolve("Promise Done"); 
})
// STEP 3: JS sees .then()
// Action: Because the Promise is already resolved, JS pushes this callback directly into the MICROTASK QUEUE.
.then((res) => {
   // Microtask Callback:
   // Waiting in the Microtask Queue for the Call Stack to clear.
   console.log(res);
});

// STEP 4: Call Stack is now EMPTY (0 items)
// The Event Loop starts checking queues in priority order:

// Priority Check #1: Microtask Queue
// Event Loop finds the .then() callback first.
// Moves it to the Call Stack and runs: console.log("Promise Done")

// Now Microstask is empty, 

// Priority Check #2: Callback (Macrotask) Queue
// Microtask Queue is now empty! Event Loop moves to the Macrotask Queue.
// Finds the setTimeout callback, moves it to the Call Stack and runs: console.log("Timeout")
// again checks Microtask Queue - empty
// checks callback queue - empty