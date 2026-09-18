// 1.Create a Promise that resolves with the string "Hello, Promises!" after 1 second.
// Log the result using .then().

const p1 = new Promise((resolve, reject) => {
   setTimeout(() => {resolve("Hello, Promises!")}, 1000);
});
p1.then((data) => console.log(data));

// 2. Reject a Promise
// Create a Promise that immediately rejects with the message "Something went wrong!".
// Handle the error using .catch().

const p2  = new Promise((resolve, reject) => {
   reject("Something went wrong!");
})
p2.catch((err) => console.error(err)); 

// 3. Simulate Coin Toss
// Return a Promise that randomly resolves to "Heads" or "Tails" after 1 second.

const p3 = new Promise((resolve, reject) => {
   let a = Math.random();
   if(a >= 0.5) {
      resolve("Heads");
   }
   else {
      resolve("Tails");
   }
});
p3.then((data) => console.log(data));

// 4. Promise with Condition
// Create a function checkAge(age) that returns a Promise.
// Resolve if age >= 18, reject otherwise.
function checkAge(age) {
   return new Promise((resolve, reject) => {
      if(age >= 18) {
         resolve("Adult.");
      }
      else {
         reject("Not an Adult!");
      }
   });
}
const p4 = checkAge(16);
p4
   .then((data) => console.log(data))
   .catch((err) => console.error(err));

// 5. Chain Promises Sequentially
// Create three Promises that log:
// "Step 1 done"
// "Step 2 done"
// "Step 3 done"
// Chain them using .then().

function runStep(stepNumber) {
   return new Promise((resolve) => {
      setTimeout(() => {
         console.log(`Step ${stepNumber} is done.`);
         resolve();
      }, 1000);
   });
}

runStep(1)
   .then(() => {
      return runStep(2);
   })
   .then(() => {
      return runStep(3);
   });


// 6. Value Transformation in Chain
// Create a Promise that resolves with 5.
// Chain .then() handlers to double it, then square it.
// Final output should be 100.

const p6 = new Promise((resolve) => {
   resolve(5);
});
p6 
   .then((num) => 2*num)
   .then((doubled) => doubled**2)
   .then((squared) => console.log("Transformed 5 to:", squared));

// 7. Chain with Random Rejection
// First .then() resolves to "Start".
// Second .then() randomly throws an error or returns "Continue".
// Handle rejection gracefully.

const p7 = new Promise((resolve) => resolve("Start"));
p7 
   .then((data) => console.log(data))
   .then(() => {
      let a = Math.random();
      if(a > 0.5) throw new Error("Random error occurred!");
      else return "Continue";
   })
   .then((data) => console.log(data))
   .catch((err) => console.error(err));

// 8. Multiple then() calls on same Promise
// Create a single resolved Promise.
// Attach two different .then() handlers to it.
// Explain that both run independently.

const p8 = Promise.resolve("Initial data");

p8.then((data) => {
   console.log("BRANCHING");
   console.log("Handler 1 received:", data);
   return "data modified by handler 1";
});
p8.then((data) => {
   console.log("Handler 2 received:", data);
   return "data modified by handler 2";
});

p8.then((data) => {
   console.log("CHAINING");
   console.log("Handler 1 received:", data);
   return "data modified by handler 1";
})
.then((data) => {
   console.log("Handler 2 received:", data);
   return "data modified by handler 2";
});

// 9. Return New Promises in .then()
// Chain multiple .then() where each returns a new Promise with a delay and logs a step like:
// “First”
// “Second”
// “Third”

function delayLog(logMessage, nextValue, ms) {
   return new Promise((resolve) => {
      setTimeout(() => {
         console.log(logMessage);
         resolve(nextValue);
      }, ms);
   });
}

Promise.resolve()
   .then(() => delayLog("First", "Second", 5000))
   .then((next) => delayLog(next, "Third", 1000))
   .then((next) => delayLog(next, null, 1000));
   
// 10. Implement fakeDBQuery()
// Create a function that simulates a DB query with a random delay and returns data (like a user object).
// Chain multiple fake queries.