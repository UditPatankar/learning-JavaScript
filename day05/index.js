console.log("Day 05");

// --- for loop ---
   // Best for when we know exactly how many times we need to run a block of code.

for(let count = 0; count <= 10; count++) {
   console.log(count);
}  

let language = "JavaScript";
for(let i = 0; i < language.length; i++) {
   console.log(language.charAt(i));
}

   // nested for loop - used usually for multi-dimensional data
for(let i = 1; i < 4; i++) {
   console.log("Row: ", i);
   
   for(let j = 1; j < 3; j++) {
      console.log("  Column: ", j);
   }
}

   // break & continue
for(let i = 0; i < 100; i++) {
   if(i % 2 == 0) continue; // "skips" even number
   if(i > 20) break; // "exits/ends" the loop 
   console.log(i);
}

   // multiple counters
for(let i=1, j=10; i<=10 && j>=1; i++, j--) {
   console.log("i: ", i, " j: ", j);
}

// --- while loop ---
   // Best for when we don't know in advance how many iterations we need.

let i = 1;
while(i <= 10) {
   console.log("run", i++);
}

// --- do-while loop ---
   // Best for when we need at least one iteration for sure

let a = 0;
do {
   console.log("Hey, Udit this side.");
} while (a > 0);