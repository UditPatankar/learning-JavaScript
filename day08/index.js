// Lexical Environment : the env(context) that's determined by where you code is physically written in the source file
   // Two components -
   // 1. Env Record : the actual variables/functions decalred in the current scope
   // 2. Reference to parents lexical env : an pointer/link to outer scope where this code was physically written

   // Everytime JS creates a scope it creates a lexical environment for that scope

console.log("Lexical Environment -");
let a = 10; 

function outer() {
   let b = 20; 
   
   function inner() {
      let c = 30;
      console.log(a, b, c);
   }
   inner();
}

outer(); // 10 20 30
// how? 
// c - found inside inner's own env
// b - not in inner's env -> found inside outer's env
// a - not in inner's env -> not in outer's env -> found inside global env
// So here each lexical environment has pointer to it's parent's lexical environment

// lexical != call-based
// lexical = where physically written
let x = "global";

function first() {
   console.log(x);
}

function second() {
   let x = "second";
   first();
}

second(); // global
// why? bcoz first is written in global scope, so first has an pointer to global lexical env
// even though first is called inside second, it does not points to second's lexical env
// "The Reference to parent is based on where code is 'written' not 'called'"

// -------------------------------------------------------------------------------------------

// Execution Context : an abstract enevironment where JS code is evaluated & executes
   // 1. GEC - created only once, immediately script first start/loads
   // 2. FEC - created evry time the function is called, even for the same function

   // components:
   // 1. Memory component (variable env)
   // 2. Code component (Thread of Execution)

   // phases - how this components are created
   // - Creation Phase : before running any code JS scans the file and
      // allocate memory to variables & functions
      // 'var' is set to undefined
      // 'let & const' are alloted memory but are kept uninitialized
      // function declaration - entire block is stored in memory(heap) & pointer is left here

   // - Execution Phase : now JS runs code line by line, top to bottom
      // assign actual values to variables
      // executes function calls
      // for each function call, a brand new EC is created

   // *** Even for an empty file JS creates an GEC, 
      // JS creates an global object 'window'
      // ad also an sepcial keyword 'this'
      // window === this -> true, means both are pointing to the same memory address

console.log(z); // undefined, before execution z was assigned with undefined
var z;
// console.log(y); // error, coz y was not initialized in creation phase
let y;
console.log(y); // undefined, coz in execution phase y got assigned with undefined

// -------------------------------------------------------------------------------------------

// Memory management with Call Stack & Heap -
   
// the GEC is pushed to the call stack 
// the creation and execution phase of GEC takes place here
// variables - var: undefined, let & const remain uninitialized (TDZ)
// functions/objects: pointer on stack (pointing to heap memory where actual code/data is stored)
// once creation phase finishes, execution starts at global level
// variables are assigned actual values & function calls get executed
// every function call creates a NEW execution context, pushed on top of the call stack

// each execution context pops off the stack AS SOON AS it individually finishes 
// (not all at once — it's continuous, top of stack finishes first, throughout execution)

// once a heap chunk (object/function) has no more references pointing to it,
// it becomes ELIGIBLE for garbage collection — GC runs on its own schedule (e.g. Mark-and-Sweep),
// not necessarily the instant references hit zero

// *** EXCEPTION: closures — an inner function can keep a reference to its outer 
// lexical environment alive in the heap, even after the outer EC has popped