console.log("day 14-");

// Error Handling in JavaScript - preventing your whole program crash

// 1. Different types of Error in JS

   // Parsing/Syntax error - occurs before code even runs 
   // you cannot do much about it, coz not even the first line could run & JS can't parse the whole file so no execution (no try catch executes)
   // const a: 20;

   // Rutime Error - occurs during execution, means syntax is fine but something went wrong during execution
   // handling this error with try & catch   
      /* 
      try {
         // logic or code
      } catch(err) {
         // handle error
      }
      */
   
   // 1. try block executes, if there is no error in it, catch block is ignored
   // 2. if error occured in try block, the execution of try block is halted/suspended 
   // and control move to catch block with all the info about the error
   // 3. needful steps can be taken to handle that error inside catch block

   // example - 
   try {
      console.log("try starts here");
      a;
      console.log("try ends here");
   } 
   catch(err) {
      console.log("an error occured:");
      console.log(err.name);
      console.log(err.message);
      console.log(err.stack);       // this tells you from where exactly the error is coming from
   }
   console.log("try & catch finished!");

// Throw -
   // ex 1
   function divideByNumber(a, b) {
      try {
         if(b === 0) {
            const err = new Error("Division by zero is not allowed!");  // creating custom error object using constuctor function
            throw err;  // throwing the custom error to catch block
         }
         
         const result = a/b;
         console.log(`a / b = ${result}`);
      }
      catch(err) {
         console.error(`an error occured: ${err}`);
      }
   }

   divideByNumber(15, 3);
   divideByNumber(15, 0);

   // ex 2
   const user = {
      name: "David",
      age: 30,
      address: {
         country: "India"
      }
   }

   function getPostal(user) {
      try {
         console.log(user.address.city.zip);
      }
      catch(err) {
         console.error(`Error in accessing property: ${err}`);
      }
   }

   getPostal(user);

   // ex 3
   function validateAge(age) {
      try {
         if(isNaN(age)) {
            throw new Error(`Invalid input: age must be a number. Your input is ${age}`);
         }

         console.log(`user age is ${age}`);
      }
      catch(err) {
         console.error(err);
      }
   }

   validateAge(30);
   validateAge("Tom");

// Rethrow
   function validateForm({username, email}) {
      try {
         if (!username) throw new Error("User name is mandatory.");
         if (!email.includes('@')) throw new Error("Invalid email format.");
      }
      catch(err) {
         // console.log(err);
         throw err;        // you are throwing the same error to where this function will be called
      }
   }

   try {
      validateForm({username: "Tom", email: "tomgmail.com"}); // rethrown error will land here, & try will throw it it's catch 
   }
   catch(err) {
      console.error("got error from while validating the form.", err); 
   }

// Finally - executes irrespective of error caught or not
   function processInformation(info) {
      try {
         console.log("Processing information...")
         if(!info) throw new Error("No information available to process.");
         console.log("Information processed.");
      }
      catch(err) {
         console.error(err);
      }
      finally {
         console.log("Cleaning: closing database connection");
      }
   }
   processInformation();

// Custom Error -
   function ValidationError(message) {
      this.name = "Validation Error",
      this.message = message
      //this.stack = new Error().stack // the prototype of Error Object's stack
   }

   //ValidationError.prototype = Object.create(Error.prototype); // will learn in OOP

   function validateCitizen(age) {
      if(age < 60) {
         throw new ValidationError("You are not an senior citizen");
      }
      return "You are a senior citizen";
   }

   try {
      let result = validateCitizen(30);
      console.log(result);
   }
   catch(err) {
      console.error(`${err.name}: ${err.message}`);
   }

// Self Assignment Operator - not a replacement for try catch yet!

   let x ;
   let y = 10;

   // x ?= 20; // x is undefined, x = 20
   // y ?= 30; // y is 10 not undefined, let it be 10