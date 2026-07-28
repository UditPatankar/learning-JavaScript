console.log("Day 3 Tasks :")

/* Let's calculate how much you earn from your office.

 You get 12,300 rupees as your monthly salary.
 You get a 20% bonus on your annual salary.
 How much money do you make per annum as a CTC?
 */
console.log("Calculate CTC with a Bonus -");
const monthly_salary = 12300;
const annual_salary = 12 * monthly_salary;
const annual_bonus = annual_salary * (20/100);
const ctc = annual_salary + annual_bonus;

console.log("  CTC: $" + ctc);

/* Let's calculate how much you pay for electricity bills per month and annually.

 Create a units variable. Based on this value you will calculate the total electricity bill for a months.
 If each day you consume the units and each unit cost 150 rupees, how much will you be charged per month?
 If there is a 20% discount on the annual payment, how much will you be charged for an annual payment?
 */
console.log("Create an Electricity Bill Calculator -");
const daily_units = 2;
const unit_cost = 15;
const monthly_bill = 30 * daily_units * unit_cost;

const ann_bill_standard = 12 * monthly_bill;
const discount = ann_bill_standard * (20/100);
const ann_bill_discounted = ann_bill_standard - discount;

console.log("  Monthly electricity bill: $" + monthly_bill);
console.log("  Annual electricty bill: $" +ann_bill_discounted);

/* Leap Year Checker
Is 2025 a Leap Year?

 Take year as input.
 Use the arithmetic operator and ternary operator to print if a year is a leap year or not.
 */
console.log("Leap year checker: ");
const year = 1900;
const isLeap = ((year % 400 == 0) || ((year % 4 == 0) && (year % 100 != 0))) ? year + " is leap." : year + " not leap.";
console.log(isLeap);

 /* Max of Three Numbers
Find the max number from the lot.

 Take three numbers and assign them to variables p, q, and r.
 Now find the maximum of these three numbers using the comparison operators.
 */
console.log("Max od Three Number:");
const p = -10;
const q = -20;
const r = -1;
const max_number = (p>q && p>r) ? p : (q>r ? q : r);
console.log("Max number: " + max_number);

/* Bitwise Doubling
A tricky one for you

 Create a variable count and assign a value, say, 5.
 Now use the Bitwise shift operator to make the number double.
 Print it on the console.
  */
console.log("Bitwise Doubling:");
let count = 5;
count <<= 1; // *** left shift by 'double' it & right shift by 1 'cuts' it in half ***
console.log(count);
