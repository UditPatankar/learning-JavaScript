console.log("Day 04 tasks:");

/* Build an ATM Cash Withdrawal System
Rajan goes to the Axis bank ATM. He enters an amount to withdraw. The ATM only allows multiples of 100. Print “Withdrawal successful” if valid, otherwise print “Invalid amount”. */
console.log("An ATM cash withdrawal-");

let amount = 1200;
if(amount % 100 == 0) {
   console.log("  Withdrawal Successful");
}
else {
   console.log("  Invalid amount - only multiple of 100 are allowed.");
}

/* Build a Calculator with switch-case
Write a simple calculator that takes an operator (+, -, , /, %) as input, and performs the operation on two numbers. Print the output on the console. */
console.log("Calculator -");

let num1 = 10;
let num2 = 30;
let operator = "+";

switch(operator) {
   case "+": console.log(num1 + num2);
   break;
   case "-": console.log(num1 - num2);
   break;
   case "*": console.log(num1 * num2);
   break;
   case "/": console.log(num1 / num2);
   break;
   case "%": console.log(num1 % num2);
   break;

   default: console.log("Invalid operator: choose between +, -, , /, %, *")
}

/* Pay for your movie ticket
Imagine, the INOX charges ticket prices based on age:

Children (<18 years): $3
Adults (18 - 60 years): $10
Seniors (60+ years): $8
Write a program that prints the ticket price based on the person’s age. */
console.log("Movie tickets based on age -");

let age = 22;
if(age < 18) 
   console.log("$3");
else if(18 <= age <= 60) 
   console.log("$10");
else 
   console.log("$8");

 /* Which Triangle?
A triangle has 3 sides. A Triangle type is determined by its sides:

All sides equal is called, Equilateral Triangle.
Two sides equal is called, Isosceles Triangle.
All sides different is called, Scalene Triangle.
Take the sides of a triangle as input and write a program to determine the triangle type. Change the inputs everytime manually to see if the output changes correctly. */
console.log("Which Triangle -");

let a = 10;
let b = 20;
let c = 10;
if(a == b == c) 
   console.log("Equilateral Triangle");
else if(a == b || b == c || a == c) 
   console.log("Isosceles Triangle");
else 
   console.log("Scalene Triangle");
