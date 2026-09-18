// What is a Promise in JS?
   /* Promise is an javascript object that represents the 'eventual completion/failure'
      of an asynchronous operation & it's resulting value.
      - it's like an proxy/placeholder for a value that is not known at the time promise os created.
   
      states -
      Pending: the asynchronous operations is in process(neither succeed, nor failed)
      FulFilled: operation succeeded & promise now has resulting value
      Rejected: operation failed & promise has reason for failure

      result -
      undefined: in pending state
      value: in fulfilled state
      error: in rejected state
   */
  
// - Initial state of promise is pending at the time it is created
let promise = new Promise(
   // executor function - runs synchronously immediately upon creation & 
   // "this function handles the async operation"
   function(resolve, reject) {
      // resolve & reject are functions given by js, that you call later 
      // but you only call one of them, 
      // depending on whether "the async operation" succeeds/rejects

      // resolve(); state: pending->fulfilled & result: undefined->value
      // reject();  state: pending->rejected & result: undefined->error
   }
);

/* --------------------------------------------------------------------------------------------- */
// PROMISE HANDLING - .then(), .catch(), .finally()

const myPromise = new Promise((resolve, reject) => {
   // At this point myPromise's
   // state: "Pending" & 
   // result: "undefined"

   // - JS runs this executor function synchronously immediately during script execution.
   // - You perform your "Async Task" here (like API call or IO operation)...
   // - You call resolve(data) when task succeeds, or reject(error) when it fails

   resolve("myPromise is resolved.");
   reject("myPromise is rejected.");
});

myPromise
   .then((result) => {
      // THIS ONLY RUNS if previous promise(myPromise), coz it only has 1 callback function
      // state: "fulfilled" 
      // result: value
      return result.toUpperCase();  // if you don't return anything, js returns undefined
   })
   .then((upperResult) => {
      console.log(upperResult);
      throw new Error("Something wrong inside second .then!");
   })
   .catch((error) => {
      // THIS RUNS ONLY if myPromise or any previous promise
      // state: "rejected"
      // result: value
      console.error(error.message);
   })
   .finally(() => {
      // THIS RUNS ANYWAYS - kinda cleanup fucntion
      console.log("Clean up done!");
   });
   
   // ** When you call this handler functions they "create & return" a brand new promise
   // - now when their call back function runs & returns something or undefined(implicitly)
   // - js automatically takes that returned value & uses it to resolve this new promise
   // - or reject this new promise if callback throws an error

   // ** Also .then( (result)=>{}, (error)=>{} ) can handle both resolved & reject promise 
   // - if previous promise is resolved callback 1 runs, if rejected callback 2 runs
   // but it's better to use .catch, 
   // coz under the hood catch is nothing but - .then( (null), (error)=>{} )

   // ** You can usually do three things inside the .then()
   // 1- return a new Promise
   // 2- or return a value from sunchronous operation
   // 3- or throw an error
   // 4- rethrow an error, control goes to the closest catch

   const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve("P1 resolved");
      }, 4000);
   });

   p1 // .then will only run when p1 gets resolved & it resolves in 4 secs 
      .then((result) => {
         console.log(result);

         // .then() creates the (outer) promise, and runs this callback function
         // since this callback returns a new (inner) promise 
         // the outer promise sees its state: pending & waits for it to get resolve/reject
         // once the inner promise is resolved/rejected, outer takes the "inner result value(value/error)" & get resolve/reject
         // but if the inner never get resolve/reject & stays in pending the outer also waits forever 

         return new Promise((resolve, reject) => {
            setTimeout(() => {
               resolve("inner promise resolved");
            }, 2000);
         });

         // in this case the inner resolves in 2secs with "inner promise resolved" as resulting value
         // outer takes the value, get resolve
      })
      .then((data) => { 
         console.log(data);
         
         // return a value
         return { username: "Om", role: "student" };
      })
      .then((user) => {
         if(user.role === "admin") {
            return user.username;
         }
         else {
            // throw an error
            throw new Error("Invalid role!");
         }
      })
      .then((username) => {   
         console.log(`Welcome, ${username}.`);
      }) 
      .catch((err) => {
         // rethrow an error
         if(err.message.toLowerCase().includes("invalid role!")) 
            throw err;
         else 
            return "There is a new error occured!";
      })
      .then((result) => {
         console.log(result);
      })
      .catch((err) => console.error(err.message));

