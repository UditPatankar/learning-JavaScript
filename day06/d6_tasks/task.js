console.log("Day 06 tasks:")

/* Write a Function to Convert Celsius to Fahrenheit
Create a function celsiusToFahrenheit(celsius) that converts a temperature from Celsius to Fahrenheit. Formula: (Celsius * 9/5) + 32 = Fahrenheit */

function celsiusToFahrenheit(celcius) {
   return (celcius * (9/5) + 32);
}

console.log(celsiusToFahrenheit(3));

/* Function to Check if a String is a Palindrome
Create a function isPalindrome(str) that checks if a given string is a palindrome (reads the same forward and backward). You can not use any string function that we have not learned in the series so far. */

function isPalindrome(str) {
   let l = 0;
   let r = str.length-1;
   while(l < r) {
      if(str[l] !== str[r]) {
         return false;
      }
         l++;
         r--;
   }
   return true;
}

console.log(isPalindrome("katak"));

/* Write a Function to Find Factorial of a Number
Create a function factorial(n) that returns the factorial of n. Example 5! = 5 * 4 * 3 * 2 * 1 */

function findFactorial(n) {
   let fact = 1;
   for(let i = n; i > 0; i--) {
      fact *= i;
   }
   return fact;
} 

console.log(findFactorial(5));

/* Write a function to Count Vowels in a String
Write a function countVowels(str) that counts the number of vowels (a, e, i, o, u) in a given string. */

function countVowels(s) {
   let count = 0;
   for(let i = 0; i < s.length; i++) {
      if(s[i] == 'a' || s[i] == 'e' || s[i] == 'i' || s[i] == 'o' || s[i] == 'u') count++;
   }
   return count;
}

console.log(countVowels("Code,HelloWorld"));

/* Write a Function to Capitalize the First Letter of Each Word in a Sentence
Write a function capitalizeWords(sentence) that takes a sentence and capitalizes the first letter of each word. You can use the toUpperCase() method of string to convert the lowercase to uppercase.
 */

function capatilizeWords(sentence) {
   let result = "";

   for(let i = 0; i < sentence.length; i++) {
      if(i === 0 || sentence[i-1] === ' ') {
         result += sentence[i].toUpperCase();
      }
      else {
         result += sentence[i];
      }
   }

   return result;
}

let sentence = capatilizeWords("hello javascript let's code.");
console.log(sentence);

/* Use an IIFE to Print “Hello, JavaScript!”
Write an IIFE that prints "Hello, JavaScript!" to the console. Here the Second word must be supplied using paramneter and argument. */

(function greetings(p) {
   console.log("Hello,",p);
}) ("JavaScript!");

/* Create a Simple Callback Function
Write a function greet(name, callback), where callback prints a message using the name parameter. */

function callback(name) {
   console.log("Hello,", name);
}
function greet(name, callback) {
   callback(name);
}
greet("Udit", callback);

