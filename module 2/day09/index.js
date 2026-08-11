console.log("Day 09 -");

// HOISTING - 
// It's the outcome of creation phase of execution context, 
// It is basically the memory allocation of creation phase where JS allocates memory to variables & functions

   // Variable hoisting -
   // 'var' is hoisted + initialized with undefined
   // 'let/const' is hoisted but NOT initialized

   console.log(a); // undefined
   var a = 10;

   // console.log(b); // reference error
   let b = 20;

   // TDZ (Temporal Dead Zone) - it only happens for let/const 
   // the time period between when variable 'let/const' is hoisted (mem allocation) & when it's declaration line executes (mem initialization) is TDZ 
   // it's the during which the variable exists but 'not' accessible

   {
      // TDZ for name starts here
      // ...
      // ..
      // .
      console.log(name); // accessing in TDZ gives ref error
      // .
      // ..
      // ...
      let name = 'Tom'; // TDZ for name ends here
      //
      //
   }

   // Function hoisting - special case
   // the entire function body gets hoisted (in heap)
   // means mem. allocation + initialization with actual value before execution phase

   test()
   function test() {
      console.log("test me");
   }

   // * function expression acts exactly as variables do - depending on var/let/const, all rules even TDZ is applied in the same way
   testAgain(); // type error coz undefined is not a function
   var testAgain = function() {
      console.log("test again");
   }

// *** "typeof" the saftey net - it's mostly used to check if something exists before using it 

console.log(typeof y); 
// undefined - even though y is not declared "typeof make sure it does throw an error"

console.log(typeof x); 
// ref error - even though x is declared "TDZ overrides the typeof safety net & throws an error"

let x = 10;