// async/await - it is not a replacement for promises, it's just syntax sugar on top of promises
// under the hood await still do the waiting for promise like the .then was doing

// why?
// Cleaner syntax: It removes the need of .then() chain, callback functions (which led to promise chaining clutter / callback hell).
// Easier Error Handling: Instead of using a separate .catch(), you can wrap the async operation inside the standard try...catch block.

// ASYNC -
// When you put async before a function, that functions always returns a promise
// even if you return a promise explicitly, the outer promise waits for the inner to settle(resolve/reject)
async function fun() {
   return Promise.resolve(101);
}
console.log(fun());

// AWAIT - 
// You can put await before anything (a Promise, a function returning a Promise, or a primitive value).
// It pauses the async function's execution until the value/Promise settles, 
// you can only use await - inside an async function or at top-level
async function foo() {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         // resolve("foo is resolved.");
         reject(new Error("foo is rejected!"));
      }, 2000);
   });
}

async function handlePromise() {
   console.log("(handlePromise) Before foo got called...");

   try {
      // JS ONLY pauses this functions execution here, return the control back to rest of the script
      const retVal = await foo();   
      // if promise is resolved exe resumes here
      console.log("(handlePromise)", retVal); 
   }   
   
   // if promise is rejected exe resumes here
   catch(error) {
      console.error(error); 
   }

   console.log("(handlePromise) Execution continues safely after try...catch block.");
}

console.log("(Global) Before handlePromise got called");
// since handlePromise is async, & it resolves with undefined(implicitly)
// check when hadlePromise completed it's execution using .then or await(inside another async function)
handlePromise().then(() => console.log("(Global) handlePromise is completed.")); 
console.log("(Global) After handlePromise got called.");
console.log("(Global) After handlePromise got called.");
console.log("(Global) After handlePromise got called.");

// Handling Multiple async/await -

const API1 = "https://jsonplaceholder.typicode.com/users/1";
const API2 = "https://pokeapi.co/api/v2/pokemon/ditt";
const API3 = "https://dummyjson.com/products/1";

async function getPromise(URL) { // the helper - handle fetching API safely
   const response = await fetch(URL);
   if(!response.ok) throw new Error(`HTTP Error: ${response.status}`);
   return await response.json();
}

async function handleAPIs() {
   // try...catch handles any synchronous runtime errors that might happen inside handleAPIs itself (e.g., typos, invalid variable references, accessing properties on undefined, or unexpected setup issues before await).
   try {
      // Promise.allSettled handles the asynchronous errors (network drops, 404 status codes, JSON parsing failures) inside your API requests without crashing the app or rejecting the whole operation.
      const responses = await Promise.allSettled([
         getPromise(API1),
         getPromise(API2),
         getPromise(API3)
      ]);

      // only resumes here when all the promises are settled
      responses.forEach((res, index) => {
         if(res.status === 'fulfilled') {
            console.log(`API${index + 1} succeed:`, res.value);
         }
         else {
            console.error(`API${index + 1} failed:`, res.reason.message);
         }
      });
   }
   catch(error) {
      console.error("Error occurred inisde handlAPIs:", error.message);
   }
}

setTimeout(() => {
   handleAPIs();
}, 4000);
