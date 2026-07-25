console.log("Day 2");

// ---- ---- Variables: used to store data in JavaScript

let fruit = "mango";
let vegetable = "corrots";

// since, vegetable holds a primitive data-type, assignment happening is "PASS BY VALUE"
// means fruit is getting copy of vegetable's value ("carrots") & 
// vegetable stays untouched even if you change fruit's value
fruit = vegetable;

// -- Specifiers --

// - 'var' : Function-scoped, can be *redeclared (not recommended)
// - 'let' : Block-scoped, can be reassigned
// - 'const' : Block-scoped, **cannot** be reassigned

var address = "Banglore";
var address = "USA"; // redeclration

let count = 3;
count = 6; // reassignment

const name = "Anshu";
// name = "Udit"; // **cannot reassign

// -- Data Types --
/* 
   *** Primitive data-types: ***
      - String : Text values ("Hello");
      - Number : Numeric values (25, 0.5)
      - Boolean : True/False (true, false)
      - Undefined : A variable declared, but not assigned
      - Null : Represents "nothing" (salary = null;)
      - BigInt : Large Numbers
      - Symbol : Unique identifiers
   *** Non-Primitive (Reference) data-types: ***
      - Object : Collection of key-value pairs
      - Array : Ordered list of values
      - Function : Code that can be executed
 */
