// CALLBACK functions both synchronous & asynchronous

// Synchronous JS - sequential flow of execution, it's like block the next until current finishes

   // when you call greet it synchronously executes the callback function
   function greet(name, callback) {
      console.log(`Hello, ${name}!`);
      callback(name);
   }
   greet("Udit", (name) => { console.log(`Bye, ${name}`)});

// Asynchronous JS - start current thing & while it finishes do something else
   // setTimeout hands the callback function to Web API and runs it asynchronously
   console.log("1");
   setTimeout(() => {
      console.log("2...");
   }, 2000);
   console.log("3");

