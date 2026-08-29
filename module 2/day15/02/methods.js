console.log("Array Methods -");

// Array Methods -

// concat()
   
   const first = [1, 2, 3];
   const second = [3, 4, 5];
   const third = [6, 7, 8];

   const mergedArr = first.concat(second).concat(third);
   console.log("mergedArr:", mergedArr);

// join() : it joins all the elements of the array, with a separator & returns an STRING
   
   const alp = ['a', 'b', 'c'];
   const joined = alp.join('---');  // desfulat separator is ,
   console.log("joined:", joined);

// fill() : mutable
   
   const colors = ["red", "blue", "green", "white"];
   colors.fill("pink", 1, 4);
   console.log("filled:", colors);

// includes() 
   
   const names = ["tom", "david", "tom", "jeet"];
   console.log("includes?", names.includes("july"));

// indexOf() & lastIndexOf() : returns index of 1st and last "occurence"
   console.log(names.indexOf("tom"), names.lastIndexOf("tom"));
   
// reverse() : mutable
   
   names.reverse();
   console.log("reverse:", names);

   // toReverse() : Immutable
   
   const items = [1, 2, 3, 4];
   console.log("toReverse:", items, items.toReversed());

// sort() : mutable
   // "default sort() method" converts the element to string type but not customized one
   
   const fruits = ["banana", "apple", "cherry", "date"];
   console.log(fruits.sort());

   fruits.sort((a, b)=> {
      // return 0 means no changes, -1 = put a before b, 1 = put a after b
      return a === b ? 0 : a < b ? 1 : -1;
   });
   console.log(fruits);

   const numbers = [2, 300, 10000, 5, 0];
   console.log(numbers.sort());

   numbers.sort((a, b)=> {
      return a === b ? 0 : a > b ? 1 : -1;
   });
   console.log(numbers);

   // toSorted() : Immutable
   
   const items2 = ["banana", "apple", "cherry", "date"];
   const sortedCopy = items2.toSorted();  // use comp for descending
   console.log("toSort:", sortedCopy);

// SLICE (copy) vs SPLICE (mutate)

   // slice - makes a copy of portion [start, end)
   
   const arr1 = [1, 2, 3, 4];
   const arr1Copy = arr1.slice(1, 4);
   console.log("arr1Copy:", arr1Copy);

   // splice - mutates the array to remove/add/replace an item
   // splice(start, deleteCount, item1, item2...);
   
   const arr2 = [1, 2, 3, 4, 5, 6];

   const deleted = arr2.splice(1, 3);  // deletion - returns deleted items 
   console.log("deleted items:", deleted);

   arr2.splice(1, 0, 'a', 'b', 'c');   // add - returns empty array
   console.log("added new items:", arr2);

   const arr3 = arr2.splice(2, 1, 3);  // replace - returns the deleted item
   console.log("replaced: delete then add:", arr2);

   // toSplice() : Immutable
   
   const months = ["jan", "feb", "may", "june"];
   const newMonths = months.toSpliced(2, 0, "march", "april");
   console.log("months:", months, "newMonths:", newMonths);

// at() - access both +ive -ive indexes

   const arr4 = ['a', 'b', 'c', 'd'];
   console.log(arr4.at(-2));  // c

// copyWithin(target: where to put the copy, start: where copying starts, end: where copying ends);
   
   arr4.copyWithin(2, 0, 2);  
   console.log(arr4);   // a b a b

// flat()

   const arr5 = [1, 2, 3, [4, 5, [6, 7, [8]]]];
   console.log(arr5.flat(Infinity));   // infinity flattens all nested level, else you will need to pass the specific level

// Grouping data - 

   const employees = [
      { name: "Alice Smith", dept: "Engineering", salary: 85000 },
      { name: "Bob Jones", dept: "HR", salary: 55000 },
      { name: "Charlie Brown", dept: "Engineering", salary: 95000 },
      { name: "Diana Prince", dept: "Marketing", salary: 70000 },
      { name: "Evan Wright", dept: "HR", salary: 60000 },
      { name: "Fiona Gallagher", dept: "Engineering", salary: 110000 },
      { name: "George Clark", dept: "Marketing", salary: 65000 }
   ];

   // pass the array & pass the item to callback fun
   // callback fun iterates each item (object in this case)
   // return the key value - means the key you want for the item in the result object {key : [item1, item2]}
   const groupedByDept = Object.groupBy(employees, ({dept}) => dept);
   console.log(groupedByDept);

   const grouptBySalary = Object.groupBy(employees, (employee) => {
      return employee.salary > 70000 ? 'High Salary' : 'Average Salary';
   });
   console.log(grouptBySalary);

   // with() : Immutable, change value at index, aloows both +ive -ive indexes
   
   const w = ['a', 'b', 'c'];
   const w2 = w.with(-1, 'd');
   console.log(w, w2);

// ----------------------------------------------------------

   // Array Like 
      // an Object
      // when you run document.getElementByTagName("li"); 
      // you will get all the li elements in an "Array Like"
   const arr_like = {a: "I", 1: "am", 2: "Array Like", length: 3};
   console.log(arr_like);
   console.log(arr_like[1]);  // access with index
   console.log(arr_like.a);   // access with key
   console.log("Is arr_like an Array?", Array.isArray(arr_like));
   console.log("Is arr_like an Object?", arr_like instanceof Object);

   // usage - 

   // when a function is created you get access to an special varibale 'arguments' inside the function
   function checkArgs() {
      
      // an Array Like holds all the info about the argument passed to this function
      console.log("Array Like arguments:", arguments); 
      
      // convert to array like to array
      
      const argsArr = Array.from(arguments); // or, we can use [...arguments];
      console.log("Array arguments:", argsArr);
   }

   checkArgs(1, 2, 'a', 'b');

   // fromAsync()
  
   /* const collectionPromise = Array.fromAsync(document.getElementsByTagName('li'));

   collectionPromise.then((value) => console.log(value)); // .then() gets registered & only runs when promise is resolved
   console.log(collectionPromise);   // while this runs immediately

   const ret = Array.fromAsync({
      0: Promise.resolve("Tom"),
      1: Promise.resolve("Google"),
      2: Promise.resolve("Apple"),
      length: 3
   }).then((value) => console.log(value));

   console.log(ret); */

   // of() - another way of creating an array
   const a1 = new Array(1, 2, 3);
   const a2 = [3, 2, 1];
   const a3 = Array.of(1, 2, 3, 'a', ['x', 'y', 20, true], false);
   console.log(a1, a2, a3);
   
   