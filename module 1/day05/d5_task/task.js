console.log("Day 5");

/* Generate a Pyramid Pattern using Nested Loop as it is shown below:
*
* *
* * *
* * * *
* * * * * */
console.log("Print the pattern -")

for(let i = 1; i <=5; i++) {
   let row = "";
   for(let j = 1; j <= i; j++) {
      row += "* ";
   }
   console.log(row);
}

/* Craete Multiplication Table (Using for loop)
Write a program to print the multiplication table of a given number up to 10. For Example: If N = 3, output should be:

3 x 1 = 3
3 x 2 = 6
...
3 x 10 = 30 */
console.log("Print the multiplication table -");

for(let i = 1; i <= 10; i++) {
   console.log("3 x ", i, " =", 3*i);
}

 /* Reverse Digits of a Number (Using while loop)
Write a program to reverse the digits of a given number using a while loop.

Example:

Input: 6789
Output: 9876 */
console.log("Reverse a Number -");

let num = -6789;
let rev = 0;
while(num !== 0) {
   let last = num % 10;
   num = Math.trunc(num / 10); // /trunc chops decimal towards 0
   rev = rev*10 + last; 
}
console.log(rev);