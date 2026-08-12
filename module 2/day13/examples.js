// some tricky examples -

// 1
const user = {
   name: "Tom",
   age: 7,
   logMessage() {

      function inner() {
         console.log(`${this.name} is ${this.age} years old.`);
      }
      inner();
   }
}

// * bcoz this is inside an standalone function, therefore 'this' always refers to windows
// but if it was an arrow function it would have inherited 'this' from parent logMessage, 
user.logMessage();

// 2
const obj = {
   name: "user1",
   greet: function() {
      console.log(`Hello, ${this.name}.`);
   }
}

const retGreet = obj.greet;   // now retGreet hold the pointer to the function
retGreet();                   // now you are calling that function in global scope, hence 'this' refers to the global object
retGreet.call(obj);  // solution - explicit binding
