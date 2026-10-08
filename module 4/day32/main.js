/* 
// Named import
// import { sum, sub } from './scripts/calc.js'; 

// Default import
// import { default as sayIt } from './scripts/speak.js'; 
import sayIt from './scripts/speak.js';  // you can import with diff name in case of default

// Aliases
import { sum as add, sub as diff } from './scripts/calc2.js'; // use aliases, in case multiple modules ares exporting with same name

// Namespace: import everything
import * as calc from './scripts/calc.js';
*/
import * as combine from './scripts/combine.js';

console.log(combine.calc.sum(5, 5));
console.log(combine.calc.sub(5, 5));

console.log(combine.sayIt());

console.log(combine.calc2.sum(5, 5));
console.log(combine.calc2.sub(5, 5));

// Dynamic import 
let shouldImport = true;
if (shouldImport) {
   const { sayHi, sayHello } = await import('./greetings.js');  // import function will return a promise here.
   sayHi();
   sayHello();
}