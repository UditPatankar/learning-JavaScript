console.log("Day 15 - Array");

// ARRAY - they are just a special type of objects, so everything we know about object like 
// lives in heap, variable holds reference etc are identical for array also
// JS array are not of fixed size, you can change it dynamically

// const mixedArr = [100, "Tom", true, ['a', 'b']];
// console.log(mixedArr[0], mixedArr[3][1]); // 100 b

// Array Creation - 

   // 1. array literal
   const salad = ["tomato", "onion", "corn", "carrot"];

   // 2. constructor function
   const cars = new Array("BMW", "Audi", "Porche");
   const emptyArr = new Array(3);

// Accessing element - 
 
   const element = cars[2];

// Adding new element - 

   cars.push("Maybach");    // at the end
   cars.unshift("Bentley"); // at the start
   console.log("new elements added:", cars);


// Remove element - 

   const popRet = salad.pop();      // removes & returns last value 
   const shiftRet = salad.shift();  // removes & returns first value
   console.log("elements are removed:", popRet, shiftRet, salad);

   // *** NOTE - push/pop/shift/unshift MUTATES the source array

// determine is it an array or not?

   console.log(Array.isArray("BMW"));
   console.log(Array.isArray(["BMW", "Audi"]));

// Destructuring in Array - 

   const [car1, car2, car3, car4] = cars; // left[variables] = right[array]
   console.log(car1, car2, car3, car4);

   // default value
   const [val1, val2 = 0] = [10];

   // skip a value
   const [a, ,c] = [100, 200, 300];

   // nested destructuring
   const nums = [10, 20, 30, [32, 34, 36, 38], 40, 50];
   const [, , , [m1, m2]] = nums;
   console.log(m1, m2); 

// Rest & Spread Operator -
   
   const users = ["tom", "david", "kunal", "samay", "khushi", "jiya"];
   console.log("users:", users);
   
   // rest - used on variable
   const [user1, user2, ...restUsers] = users;
   console.log("rest of the users:", restUsers);

   // spread - used on array side
   const newUsers = ["brad", "leo", ...users];
   console.log("new updated users:", newUsers);

   // Copy & Clone -
   const orgArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   const sliceCopy = orgArr.slice();
   const [...restCopy] = orgArr;
   const spreadCopy = [...orgArr];

   console.log(
      "original array:", orgArr,
      "slice copy:", sliceCopy,
      "rest copy:", restCopy,
      "spread copy:", spreadCopy
   );

   // Swap using destructuring-
   let x = 1;
   let y = 2;
   [x, y] = [y, x];
   console.log(x, y);

   // Merge using spread -
   let numb = [1, 2, 3];
   let alp = ['a', 'b', 'c'];
   let alphaNum = [...numb, ...alp];
   console.log(alphaNum);

// Array Length -
   
   const arr1 = [1, 2, 3];
   const arr2 = ["p", "q"];

   arr1.length = 2;
   console.log(arr1, arr1.length);  
   
   arr2.length = 0;              // empty the array
   console.log(arr2, arr2.length);  
   
   arr2.length = 2**32-1;        // max length of an array
   console.log(arr2, arr2.length);  
