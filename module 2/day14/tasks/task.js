// 1. What will be the output of the following code?
   try {
      let r = p + 50;
      console.log(r);
   } catch (error) {
      console.log("An error occurred:", error.name);
   }
   // Reference error : coz p is not defined & you are trying to access it

// 2. Write a function processPayment(amount) that checks if the amount is positive and not exceeding balance. If any condition fails, throw appropriate errors

   let balance = 300;

   function processPayment(amount) {
      if(amount <= 0) throw new Error("Invalid amount: amount must be positive!");
      if(amount > balance) throw new Error(`[Payment Error] Insufficient balance: amount ${amount} exceeds the available balance ${balance}.`);

      balance -= amount;
      console.log("Payment successful! available balance = ", balance);
   }

   try {
      processPayment(200);
      processPayment(350);
   }
   catch(err) {
      console.error(err.message);
   }

// 3.  Implement a custom error handling system for an e-commerce website that categorizes errors as
// UserError
// PaymentError
// ServerError
// EmailError

   function CustomError(name, message) {
      this.name = name,
      this.message = message
   }

   const userErr = new CustomError("User Error", "An error occured at user's end.");
   const paymentErr = new CustomError("Payment Error", "An error occured while processing the payment. Please try again later.");
   const serverErr = new CustomError("Server Error", "An error occured at server side. Please try again later");
   const emailErr = new CustomError("Format Error", "Invalid email format: email should have an valid format.");

   console.error(`${serverErr.name} : ${serverErr.message}`);

// 4. Simulate an API call function fetchData(url). If the URL does not start with "https", throw an "Invalid URL" error. Handle it using try...catch

   function fetchData(url) {
      if(!url.startsWith("https")) {
         throw new Error("Invalid URL: Protocol must start with https")
      }

      return "Data fetched...";
   }

   try {
      let data = fetchData("https://google.com");
      console.log(data);
   }
   catch(err) {
      console.error(`${err.name}: ${err.message}`);
   }

   try {
      data = fetchData("http://google.com");
      console.log(data);
   }
   catch(err) {
      console.error(`${err.name}: ${err.message}`);
   }

// 5. Implement a custom error type ValidationError using constructor functions to handle form validation errors 
// ValidationError: Username cannot be empty
// ValidationError: Age must be a positive number

   function ValidationError(message) {
      this.name = "ValidationError";
      this.message = message;
   }

   function validateFormData({username, age}) {
      if(!username && age <= 0) throw new ValidationError("Username cannot be empty & Age must be a positive number");
      if(!username) throw new ValidationError("Username cannot be empty.");
      if(age < 0) throw new ValidationError("Age must be a positive number");

      return "Form data is valid.";
   }

   try {
      let result = validateFormData({username: "", age: -3});
      console.log(result);
   }
   catch(err) {
      console.error(`${err.name}: ${err.message}`);
   }

//6. Write a function readFile(filePath) that simulates reading a file. If the file does not exist (simulate with a condition), throw a "File not found" error. Handle the error with try...catch. Make sure you have code to handle releasing the IO resources

   function readFile(filePath) {
      let exsitingFiles = ["/Pictures/backgrounds/image1.png", "/Document/drivinglicence.pdf", "/Films/Akira.mp4"];
      let isAllocated = false;

      try {
         if(!exsitingFiles.includes(filePath)) throw new Error("File not found. File path must be correct.");

         console.log("Allocation I/O resources.");
         isAllocated = true;
         console.log("Reading the file...");
         console.log("File content.");
      }
      catch(err) {
         console.error(err.message);
      }
      finally {
         if(isAllocated) console.log("Realising allocated I/O reasources.");
      }
   }

   readFile("/Films/pulpfiction.mp4");
   readFile("/Films/Akira.mp4");


// 7. . Write a function parseJson(str) that takes a JSON string and tries to parse it using JSON.parse(). If parsing fails, catch the error and return "Invalid JSON"

   function parseJson(str) {
      try{
         return JSON.parse(str);
      }
      catch(err) {
         return "Invalid JSON."
      }
   }

   console.log(parseJson(`{"name": "Akira", "age": 19}`));
   console.log(parseJson(`{"name": "Akira", age: 19}`));