"use strict";
console.log("Day 13 -");

// this in GLobal - 
   // since we know JS give you 'window' object & 'this' keyword even for an empty file, so at global level 'this' is bound to the window object
   console.log("this at global level", this); // window object
   // now apart from the global aspect there are two other aspect to understand 'this' - object & function

// Inside of an object - Implicit Binding
   // whenever 'this' is inside an method, 'this' will bound to the object on which you are calling that method

   const employee = {
      empId: "A001",
      firstName: "Alex",
      lastName: "B",

      returnThis: function() {
         return this;
      },

      getFullName: function() {
         return `${this.firstName} ${this.lastName}`;
      }
   }

   // here this is inside returnThis & you are calling it on employee so this bound to employee
   console.log("this is inside the employee object", employee.returnThis());
   console.log("constructed full name using this", employee.getFullName()); 

   // example 2 
   const tom = {
      name: "Tom",
      age: 7
   }

   const jerry = {
      name: "Jerry",
      age: 2
   }

   // now at this point you cannot tell what this is bound to
   function addMethod(obj) {
      obj.logMessage = function() {
         console.log(`${this.name} is ${this.age} years old!`);
      }
   }
   
   // but now since the methods are added in tom & jerry you know what this is bound to? (on whatever obj you call the method)
   addMethod(tom);
   addMethod(jerry);
   
   tom.logMessage();
   jerry.logMessage();

// Inside an standalone function - 
   // incase of functions 'this' always referes to the window object, but if you are using "strict mode" it's undefined

   function sayName() {
      console.log("this inside a function", this);          // window/undefined
   }     
   sayName(); 

   function outer() {
      console.log("this inside outer function", this);      // window/undefined
      return function() {
         console.log("this inside inner function", this);   // window/undefined
      }
   }

   const inner = outer();
   inner();

// Inside Arrow function -
   // arrow functions always inherits 'this' from their surrounding lexical env, 
   // arrow's this never get bound to the object directly

   const getArrow = () => this;  // *even though you are in strict mode, for arrow function this refers to window object
   console.log("this is inside getArrow function in global scope", getArrow()); 

   const food = {
      name: "mango",
      color: "yellow",
      // now, 'this' is inside arrow function & it surrounding lexical env is global env (global this = window, so arrow this = window)
      // and window doesn't have name or color property, so u get - undefined for both
      getDescription: () => `${this.name} is ${this.color}` 
   }

   console.log("this is inside fo arrow function [object[arrow[this]]]", food.getDescription());

   const vege = {
      name: "tomato",
      color: "red",
      outerFun() {
         // outer env, this = vege
         // since arrow inherits from the outer env
         return () => `${this.name} is ${this.color}`;
      }
   }

   const arrowInner = vege.outerFun();
   console.log("this is inside arrow function but [object[outerFun[arrow[this]]]]:", arrowInner());

// Explicit Binding -
   // binding this to object that is not related to it
   // three ways to do it - call, apply & bind

   const obj1 = {
      name: "Harry",
      age: 20
   }

   function likes(hobby1, hobby2) {
      console.log(`${this.name} likes ${hobby1} and ${hobby2}`);  // now 'this' is nowhere related to any object
   }

   // 1. call - since like has 2 params, call expects an object & 2 args separately
   // likes.call(obj1, "football", "music");  

   // 2. apply - but apply expects a object & an array 
   const hobbies = ["football", "music", "sleeping"];
   // likes.apply(obj1, hobbies);

   // 3. bind - similar to call but bind returns a complete new function to you, having the this binded to the object 
   const newLikes = likes.bind(obj1, "football", "music");
   newLikes();