console.log("day 3");

// --- Operator & Expression ---

// Operators: + - * /
// Operands: x + y , x & y are operands here
// Expressions: x = 2 (assignment exp) & x = 2+3 (evaluating exp)

// 1. Arithmetic operators -
console.log("** Arithmetic Operator **");
let a = 2;
let b = 3;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a ** b); 
console.log(a % b);

let count = 5;
console.log(count++); // 5, return current value first, then increments
console.log(++count); // 7, first increments, then returns the value

// 2. Assignment Operator -
console.log("** Assignment Operator **");

let x = 10;
x += 5; // x = x + 5
x -= 5;
console.log(x*10);

// 3. Comparison Operators -
console.log("** Comparison Operator **");

console.log(0 == false); // loose equality : js implicitly converts both to common type then checks
console.log(3 == '3');  // int(3) == int(3) , in this case

console.log(3 === '3'); // strict equality : this checks both type & values w/o any conversion   
console.log(null === null);
console.log(undefined === undefined);
console.log(NaN === NaN);
// *** In case of strict equality it always returns true/false when :
   // true - both side have same type & value, both are null/undefined
   // false - if one is NaN, no matter what's on other side

let obj1 = {'name': 'Anshu'}; // pointing to some MA XX001
let obj2 = {'name': 'Anshu'}; // poiting to some MA YY001
console.log(obj1 === obj2); 
console.log(obj1 != obj2);
// since non-primitive value are stored on heap & pointer to MA are place in stack
// Primitives: JS compares Type + Value.
// Non-Primitives: JS compares Memory Address alone (for both == and ===)

// 4. Logical Operators - && || ?? !
console.log("** Logical Operator **");

   // && - returns 1st falsy operand OR returns last operands if all are truthy
console.log(false && true); // false(1st falsy)
console.log(true && false); // false(last coz rest are turthy)
console.log(true && true); 
console.log(3 && 6); // 6(last)
console.log("Cow" && "Horse"); // Horse, rest are truthy operands

   // || - returns 2st turthy operand OR last operand if all are falsy 
console.log(false || false); // returns last, coz rest are falsy
console.log(true || false); // returns 1st truthy operand
console.log("Cow" || "Horse"); // returns 1st truthy operand i.e "Cow"
 
   // ?? - Nullish Coalescing Operator : returns the first not-null/not-undefined operand
console.log(null ?? 1); // 1
console.log(undefined ?? 0); // 0
console.log(false ?? "Cow"); // false
console.log(0 ?? 10); // 0

// 5. Conditional/Ternary Operator -
console.log("** Conditional/Ternary Operator **");

let age = 23;
let category = (age >= 18) ? "Adult" : "Minor";
console.log(category); // Adult

// 6. Bitwise Operator -
console.log("** Bitwise Operator **");

// ***note: JS uses 32-bit integers for numbers during Bitwise operations
// example 15(1111) or 9(1001) it's actaully - 00000000 00000000 00000000 00001001

// 1111 & 1001 = 1001, only return 1 when both bit are 1
// 1111 | 1001 = 1111, return 1 when any bit is 1
// 1111 ^ 1001 = 0110, reurn 1 only if one bit is 1
// left shift (9 << 2) --> (1001 << 2) : last 8bits 00001001 --> 00100100 or 100100 shifted each bit to left by 2 positions
// right shift (9 >> 2) --> (1001 >> 2) : last 8bits 000010001 --> 00000010 or 0010 shifted each bit to right by 2 positions
 
// here numbers are first converted to binary then whole operations or process is performed on those binary, it's like (15 & 9) --> (1111 & 1001)
console.log(15 & 9); // 9
console.log(15 | 9); // 15
console.log(15 ^ 9); // 6
console.log(9 << 2); // 36
console.log(9 >> 2); // 2 