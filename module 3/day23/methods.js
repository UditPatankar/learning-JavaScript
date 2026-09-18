function getPromise(URL) {
   return fetch(URL)
      .then((response) => {
         // coz fetch treats status 404, 500... as successful HTTP response, 
         // we need to throw an error explicitly
         if(!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
         }

         // else format the response
         return response.json(); // this also returns a promise
      })

      // here .then() will either return a rejected promise with the explicit error
      // or it will return a fulfilled promise with formatted response

      // So this function will return a promise(by .then) or Rejected Promise(by fetch) 
}

// test api's
const API1 = "https://jsonplaceholder.typicode.com/users/1";
const API2 = "https://pokeapi.co/api/v2/pokemon/ditt";
const API3 = "https://dummyjson.com/products/1";

const promise_1 = getPromise(API1);
const promise_2 = getPromise(API2);
const promise_3 = getPromise(API3);

// Static Promise Methods - 

// Promise.all(arrayOfPromises) - takes an array of promises & returns a new promise
// if all array promises are resolved, the new promise get resolved with the array of results
// if any array promise is failed all others are ignored & new promise gets rejected with that error

Promise.all([promise_1, promise_2, promise_3])
   .then((results) => {
      console.log("Promise.all - All requests succeeded:", results);
   })
   .catch((error) => {
      console.error("Promise.all - Failed because one request rejected:", error.message);
   });

// Promise.any(arrayOfPromises) - 
// this 'does not' wait for all the promises to get resolved, 
// it returns the new promise resolved with result of "first resolved promise from array"
// if all array promise get rejected, then only it returns the new promise rejected with "AggregateError: All promises were rejected"

Promise.any([promise_1, promise_2, promise_3])
   .then((firstSuccess) => {
      console.log("Promise.any - First request to successfully resolve:", firstSuccess);
   })
   .catch((aggregateError) => {
      console.error("Promise.any - All requests failed:", aggregateError.errors);
   });

// Promise.allSettled(arrayOfPromises) -
// returns a new promise that is resolves after all the array promises are settled 
// ( means either resolved or rejected)
// It never rejects, & resolves with an array of objects( that describes outcome of each array promise)

Promise.allSettled([promise_1, promise_2, promise_3])
   .then((outcomes) => {
      console.log("Promise.allSettled - Every request finished:", outcomes);
   })

   // using catch is useless coz allSettled(), never returns a rejected promise.
   .catch((error) => {
      console.error(error);
   });

// Promise.race(arrayOfPromises) - 
// takes an array of promises & returns a new promise
// this resolves or rejects as soon as ANY promise in the array "settles" (finishes first)
// if the winner resolves, the race promise resolves with that value
// if the winner rejects, the race promise rejects with that error (ignoring everything else)

Promise.race([promise_1, promise_2, promise_3])
   .then((winnerValue) => {
      console.log("Promise.race - First request to finish (Fulfilled):", winnerValue);
   })
   .catch((winnerError) => {
      console.error("Promise.race - First request to finish (Rejected):", winnerError.message);
   });

// -------------------

function query(endpoint, options) {
   return new Promise((resolve, reject) => {
      // when query() is called, caller immediately gets a this promise(pending, undefined) let's all this "NewPromise"
      setTimeout(() => {
         // after thsi 2secs are passed, this callback runs & fetch() retuns a promise(lets say Pf)
         // if Pf is resolved, .then(1) handles it
         fetch(`http://localhost:3000/${endpoint}`, options)
            // .then(1) returns either resolved promise with (formatted response) or rejected promise with explicit error
            .then((response) => {
               if (!response.ok) {
                  throw new Error(`HTTP error ${response.status}`);
               }
               return response.json();
            })
            // .then(1) resolved promise will be handled by .then(2) which will resolve the NewPromise with data
            .then((data) => resolve(data))
            // .then(1) rejected promise will be handled by .catch whcih will reject the NewPromise with error
            .catch((error) => reject(error));
      }, 2000);
   });
}

