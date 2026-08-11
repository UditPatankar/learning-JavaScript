console.log("Day 06");
// --- Function - allows you to resuse your code
   
   // Define or Declare a function
function printThis() {
   console.log("Printing...");
}

   // Call or Invoke a function 
printThis();

   // Function as Expression
let printMe = function() {
   console.log("Print Me");
}
console.log(printMe);
printMe();


// --- Parameters & Arguments ---
function sum(a , b) { // parameters - placeholders
   return a + b;
}

let result = sum(10, 20); // arguments - values
console.log(result);

   // Default parameter 
function calc(a, b) { // assign default value, (a=0, b=0)
   return (2 * (a+b));
}

      // if you do not pass the 2nd argument here, function will use default value (it can be 'undefined' in case you don't assign any vlaue to variable after creating it) & result will be NaN coz you are operating on 'undefined'
const res = calc(2); 
console.log(res);

   // *** Rest parameter
function calculateThis(x, y, ...rest) {
   console.log(x, y, rest);
}

      // note: rest parameter can only be declared at the "end" (not in middle, not at starting)
      //1&2 will get assigned to x&y and rest of the arguments will be assigned to "rest parameter" JS creates an array of this rest values
calculateThis(1, 2, 3, 4, 5, 6, 7, 8, 9); 

// --- Nested Function ---

function outer() {
   console.log("Outer");

   function inner() { // you cannot call this inner function outside the outer function until you return it
      console.log("Inner");
   }

   return inner;
}

let retFun = outer();
retFun();

// --- CALL BACK ---

const shouldCall = true;

function foo(fun) {
   console.log("Foo!");
   
   //fun();  
   // *** who calls the callback function? it will be called based on buissness case & user logic
   if(shouldCall) {
      fun();
   }
}  

foo(function() { // anonymous function
   console.log("Buz!");
});

// --- PURE function ---

function greetings(name) {
   return "Hello! " + name;
}

console.log(greetings("Udit")); // this is pure function,
console.log(greetings("Udit")); // coz it produces
console.log(greetings("Udit")); // same op for same ip everytime

   
let greetingMsg = "Namastey! ";

function greetingsAgain(name) { // Impure function
   return greetingMsg + name;    // containing some impurity
}

console.log(greetingsAgain("Udit")); // not producing the same op for same ip
console.log(greetingsAgain("Udit")); // why? coz the op of the function is quite influenced by something outisde of the function
greetingMsg = "Hola! ";             // & this something is called "SIDE-EFFECT"
console.log(greetingsAgain("Udit")); 

// --- HIGHER ORDER function ---

   // An higher order function can 
   // take another function as an argument or 
   // it can also return a function
   // it is used mostly to create wrapper around some functionality

function higher(argFun) {
   argFun();
}

higher(function() {
   console.log("1. Can take arguments as a function.");
});

function higherAgain() {
   return function() {
      console.log("2. Return another function.");
   }
}

const retFunc = higherAgain();
retFunc();

// --- ARROW function ---

let arrFun = (msg) => {
   return msg + " great";
} 
console.log(arrFun("Everything is"));

// --- IIFE (Immediately Invoked Function Expression)
   // create a anynomous function put it in group operator '()' and call immediately using (params);

(function(q) {
   console.log("IIFE" + q);
}) (" Who?");
