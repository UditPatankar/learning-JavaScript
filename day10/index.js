console.log("Day 10 -");

// SCOPE - is just a concept of "whaere a variable is accessible".
   // types - 
   // 1. Global scope
   // 2. Function scope
   // 3. Block scope
   // 4. Module scope

// 1. Global Scope - variable declared outside a function/block scope is global variable  

   let a = "global";
   function test() {
      console.log(a);
   }
   test();

   // * note: even for an empty file JS creates window (object) & this (keyword) . {for Node the name of object is "global"}
   // so if you declare somehting with 'var' in global scope it becomes the property of window, but that's not in case of let/const
   var x = "hey window"; // get attached to window as property

// 2. Function Scope - variable dclared inside the function & accessible inside the function

   function toDo() {
      var y = "task";
      console.log(y);
   }
   toDo();

// 3. Block Scope - 

   {
      let y = 10;
      var z = 20;
      console.log(y, z);
   }
   // console.log(y, z); // y is not defined

   function first() { 
      { 
         var v = "var is fun scoped";
         let l = "let/const is block scoped";
      }
      console.log(v);
      //console.log(l); // not defined
   }
   first();
   //console.log(v); // not defined - coz it's scope is function 

   // * note - var is function scoped not block scoped
      // but let/const are block scoped
      // therefore var is not recc for loops coz it can be accessed outside the loop
// Scope Chain - it always happens from inner to outer 

let globalVar = "I am the global variable";

function outer() {
   let outerVar = "I am the outer variable";
   function inner() {
      let innerVar = "I am the inner variable";
      console.log(globalVar);
      console.log(outerVar);
      console.log(innerVar);
   }
   inner();
}
outer();