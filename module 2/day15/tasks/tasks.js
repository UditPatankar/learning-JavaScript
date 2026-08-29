console.log("Day 15 Arrays: Tasks");

//  T-001: Create an array of 5 elements using the Array Constructor.
   
   const arr1 = new Array(1, 2, 3, 4, 5);
   console.log("task1:", arr1);

//  T-002: Create an array of 3 empty slots.
   
   const arr2 = new Array(3);
   console.log("task2:", arr2);

//  T-003: Create an array of 6 elements using the Array literals and access the fourth element in the array using its length property.
   
   const arr3 = [1, 2, 3, 4, 5, 6];
   console.log("task3:", arr3[arr3.length-3]);

//  T-004: Use the for loop on the above array to print elements in the odd index.
   
   const arr4 = [1, 2, 3, 4, 5, 6];
   console.log("task4:");
   for(let i = 0; i < arr4.length; i++) {
      if(i%2 !== 0) console.log(arr4[i]);
   }

//  T-005: Add one element at the front and the end of an array.

   const arr5 = [1, 2, 3, 4];
   arr5.unshift(0);
   arr5.push(5);
   console.log("task5:", arr5);

//  T-006: Remove an element from the front and the end of an array.

   const arr6 = [0, 1, 2, 3, 4, 5];
   arr6.pop();
   arr6.shift();
   console.log("task6:", arr6);

//  T-007: Create an array containing the name of your favourite fruits(10 fruits). Destructure the 6th fruit element from the array using destructuring.

   const arr7 = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'];
   const [,,,,, fruitSix] = arr7;
   console.log("task7:", fruitSix);

//  T-008: Take out the last 8 fruit items from the above array using the Array destructuring. Hint: rest parameter.

   const arr8 = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'];
   const [,,...lastEightFruits] = arr8;
   console.log("task8:", lastEightFruits);

//  T-009: Clone an Array(Shallow cloning)

   console.log("task9:");
   const arr9 = [1, 2, 3, {name: "original"}];
   
   const deepCopy = structuredClone(arr9);
   deepCopy[3].name = "deep";
   console.log(arr9[3].name);
   console.log(deepCopy[3].name);

   const shallowCopy = [...arr9];
   shallowCopy[3].name = "shallow";
   console.log(arr9[3].name);
   console.log(shallowCopy[3].name);

//  T-010: Empty an array using its length property

   const arr10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   arr10.length = 0;
   console.log("tasks10:", arr10);

//  T-011: Create an array of 10 elements(number 1 to 10). Resize the array to length 6 once you find the number 5 in that array. Hint: Use for-loop.

   const arr11 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   for(let i = 0; i < arr11.length; i++) {
      if(arr11[i] === 5) {
         arr11.length = 6;
         break;
      }
   }
   console.log("task11:", arr11);

//  T-012: Create an Array of 10 elements. Use the splice() method to empty the array.

   const arr12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   arr12.splice(0);
   console.log("task12:", arr12);

//  T-013: Create an Array of 10 elements. You can empty the array in multiple ways: using the length property, using the pop() method, using the shift() method, setting the array with [], or the splice() method. Which among these methods are most efficient and why?

   // It's arr = [] & arr.length = 0, both does takes O(1) & O(n) or O(1)

//  T-014: What happens when you concatenate two empty arrays?

   // You get a brand new empty array

//  T-015: How can you check if a value is partially matching with any of the elements of an Array?

   const arr15 = ['apple', 'banana', 'mango', 'pineapple'];
   const searchWord = "banana";
   const partialMatch = "pine";
   console.log("task15:");
   console.log("  search banana:", arr15.includes(searchWord));
   console.log("  search pine:", arr15.some(x => x.includes(partialMatch)));

//  T-016: What is the difference between the slice() and splice() methods?

   // slice(start, end) is immutable - returns a copied portion of an array, 
   // splice(start, deleteCount, additem1, additem2...) is mutable - add/delete/replace items in the original array

//  T-017: Create an Array of alphanumeric strings. Sort the elements in both ascending and descending orders. You must be doing this in an immutable way such that the source array never gets modified.

   const arr17 = ["user123", "alpha45", "99bottles", "js2026", "b3stCode"];
   const sortedAsc = arr17.toSorted();
   const sortedDesc = arr17.toSorted((a, b) => {  
      return a < b ? 1 : -1; // 0: no change, -1: a before b, 1: a after b
   });
   console.log("task17:");
   console.log("sorted ascending:", sortedAsc);
   console.log("sorted descending:", sortedDesc);

//  T-018: Can you give examples of sparse and dense arrays?

   // A dense array is a standard array where every single index contains a value (even if that value is null or undefined).
   const denseArray = ["apple", "banana", "cherry"];
   // A sparse array contains empty slots (gaps) where no data or property exists at certain indexes. 
   const sparseArray = ["apple", , "cherry"];
   console.log("task18:", 1 in sparseArray);

//  T-019: Give a practical usages of the .fill() method

   // 1. Generating Sequences or Mock Data
   const arr19 = Array(5).fill(0).map((item, index)=>index+1); // *w/o fill(0) array slots are empty & map() skips them
   console.log("task19:", arr19);

   // 2. Data Masking (Security)
   const cardNumber = ['4', '0', '0', '0', '1', '1', '2'];
   cardNumber.fill("*", 0, -3);
   console.log("task19:", cardNumber.join(""));

   // 3. Matrix Initialization (2D Arrays)
   // const grid = Array(3).fill(Array(3).fill(0));   //  JavaScript creates one single inner array [0, 0, 0] in memory. It then duplicates the pointer/reference to that exact same inner array into all three rows.
   const grid = Array(3).fill(null).map(()=>Array(3).fill(0));
   console.log("tasks19:", grid);

// T-020: How to convert an array to a string?

   const arr20 = [1, 0, 0, 1];
   console.log("task20:", arr20.join(""));
   console.log("task20:", arr20.toString());
   console.log("task20:", `${arr20}`);
   console.log("task20:", JSON.stringify(arr20));

// Consider these input arrays for question T-21 to T-48
// employees array: An array of emplyees working in a department.
const employees = [
  { id: 1, name: "Alice", departmentId: 1, salary: 5000 },
  { id: 2, name: "Bob", departmentId: 2, salary: 7000 },
  { id: 3, name: "Charlie", departmentId: 3, salary: 4500 },
  { id: 4, name: "Diana", departmentId: 1, salary: 5500 },
  { id: 5, name: "Edward", departmentId: 2, salary: 8000 },
  { id: 6, name: "Fiona", departmentId: 4, salary: 6000 },
  { id: 7, name: "George", departmentId: 3, salary: 5200 },
  { id: 8, name: "Helen", departmentId: 4, salary: 7200 },
  { id: 9, name: "Ian", departmentId: 2, salary: 4800 },
  { id: 10, name: "Jane", departmentId: 1, salary: 5100 },
];
// departments array: An array of departments where emplyees work.
const departments = [
  { id: 1, name: "HR" },
  { id: 2, name: "Engineering" },
  { id: 3, name: "Marketing" },
  { id: 4, name: "Sales" },
];

//  T-021: Can you filter employees who work in the "Engineering" department?

   const engineeringId = departments.find(d => d.name === "Engineering")?.id;
   const engDepEmp = employees.filter(emp =>emp.departmentId === engineeringId );
   console.log("task21:", engDepEmp);

//  T-022: Create a new array that combines employee names and department names in the format: "Alice (HR)".

   const formattedEmployees = employees.map((emp) => {
      // get the department 
      const dep = departments.find(d => d.id === emp.departmentId);
      // return the formatted name
      return `${emp.name}(${dep ? dep.name : "Unknown"})`;
   });
   console.log("task22:", formattedEmployees);

//  T-023: Find the highest salary among employees.

   const highestSalary = employees.reduce((acc, emp) => emp.salary > acc.salary ? emp : acc ).salary;
   console.log("task23:", highestSalary);
   // OR
   const highestSal = Math.max(...employees.map(e => e.salary));
   console.log("task23:", highestSal);

//  T-024: Check if there is at least one employee in the "Sales" department.

   const salesId = departments.find(d => d.name === "Sales")?.id;
   const hasSalesEmployee = employees.some((emp) => {
      return emp.departmentId === salesId;
   });
   console.log("task24:", hasSalesEmployee);

//  T-025: Write a function to filter employees earning more than 6000.

   const getHighEarners = (employees, threshold) => {
      return employees.filter(e => e.salary > threshold);
   }
   const highEarners = getHighEarners(employees, 6000);
   console.log("tak25:", highEarners);

//  T-026: Create an array of employee names only.

   const employeeNames = employees.map(e => e.name);
   console.log("taks26:", employeeNames); 

//  T-027: Calculate the total salary of all employees using

   const totalSalary = employees.reduce((acc, emp) => acc+emp.salary, 0);
   console.log("task27:", totalSalary);

//  T-028: Is there any employee earning less than 5000?

   const hasLessSalary = employees.some(e => e.salary < 5000);
   console.log("task28:", hasLessSalary);

//  T-029: Find the first employee who earns exactly 5100.

   const earner5100 = employees.find(e => e.salary === 5100);
   console.log("task29:", earner5100);

//  T-030: Find the last employee in the "HR" department.

   const hrId = departments.find(d => d.name === "HR")?.id;
   const lastHrEmployee = employees.findLast(emp => emp.departmentId === hrId);
   console.log("task30:", lastHrEmployee);

//  T-031: Find the first employee in the "Marketing" department.

   const marketingId = departments.find(d => d.name === "Marketing")?.id;
   const firstMarketingEmp = employees.find(e => e.departmentId === marketingId);
   console.log("task31:", firstMarketingEmp);

//  T-032: Check if all employees earn more than 4000.

   const doesAllEarn4000 = employees.every(e => e.salary > 4000);
   console.log("task32:", doesAllEarn4000);

//  T-033: Find the first employee in the "Sales" OR "HR" department.

   const targetDepIds = departments.filter(dep => dep.name === "Sales" || dep.name === "HR").map(d => d.id);
   const firstTargetEmp = employees.find(emp => targetDepIds.includes(emp.departmentId));
   console.log("task33:", firstTargetEmp);

//  T-034: Verify if all employees belong to a department listed in the departments array.

   const departmentIds = departments.map(d => d.id);
   const allEmployeesHaveValidDept = employees.every(emp => departmentIds.includes(emp.departmentId));
   console.log("taks34:", allEmployeesHaveValidDept);

//  T-035: Log each employee's name and department name to the console.

   console.log("task35:");
   const depMap = Object.fromEntries(departments.map(d => [d.id, d.name])); // map the dep id with name
   employees.forEach((emp) => {
      console.log(`${emp.name} works in ${depMap[emp.departmentId]}`);
   });

//  T-036: Extract all employee names into a single array.

   const allEmployeeNames = employees.map(emp => emp.name);
   console.log("taks36:", allEmployeeNames);

//  T-037: Increment each employee's salary by 10%

   console.log("task37:");
   const updatedEmployees = employees.map(emp => ({
      ...emp, salary: emp.salary + emp.salary*0.1
   }));
   updatedEmployees.forEach(e => console.log(e.salary));

//  T-038: Assume each employee can have multiple skills. Create an array of employee skills and flatten them. Means create a single list of all the skills. Example: [{name: "Alice", skills: ["Excel", "Management"]}, ...].

   const employeeSkillsSource = [
      { employeeId: 1, skills: ["Excel", "Onboarding"] },
      { employeeId: 2, skills: ["JavaScript", "React"] },
      { employeeId: 3, skills: ["SEO", "Copywriting"] },
      { employeeId: 4, skills: ["Excel", "Recruiting"] },
      { employeeId: 5, skills: ["Node.js", "AWS"] },
      { employeeId: 6, skills: ["Negotiation", "CRM"] },
      { employeeId: 7, skills: ["Google Analytics", "Branding"] },
      { employeeId: 8, skills: ["Cold Calling", "Closing"] },
      { employeeId: 9, skills: ["Python", "SQL"] },
      { employeeId: 10, skills: ["HRIS", "Employment Law"] }
   ];

   const allSkills = [...new Set(employeeSkillsSource.flatMap(item => item.skills))]
   console.log("taks38:", allSkills);

//  T-039: Find the total salary of all employees working in the "Engineering" department.

   const engineeringDepTotalSalary = employees.reduce((acc, emp) => {
      if(depMap[emp.departmentId] === "Engineering") {
         acc += emp.salary;
      }
      return acc;
   }, 0);
   console.log("task39:", engineeringDepTotalSalary);

//  T-040: Check if there is any department where all employees earn more than 5000.

   const matchingDepartments = departments.filter(dep => {
      const depEmployees = employees.filter(emp => emp.departmentId === dep.id);
      return depEmployees.length>0 && depEmployees.every(e => e.salary > 5000);
   }).map(d => d.name);
   console.log("task40:", matchingDepartments.length > 0 ? matchingDepartments : "Not Found");

//  T-041: Assume each employee has a projects array (e.g., { id: 1, name: "Alice", projects: ["Project A", "Project B"] }). Find the total number of unique projects being handled across all employees.

   const employeesProjectsSource = [
      { id: 1, name: "Alice", departmentId: 1, salary: 5000, projects: ["Project Alpha", "Project Beta"] },
      { id: 2, name: "Bob", departmentId: 2, salary: 7000, projects: ["Project Beta", "Project Gamma", "Project Delta"] },
      { id: 3, name: "Charlie", departmentId: 3, salary: 4500, projects: ["Project Epsilon"] },
      { id: 4, name: "Diana", departmentId: 1, salary: 5500, projects: ["Project Alpha", "Project Zeta"] },
      { id: 5, name: "Edward", departmentId: 2, salary: 8000, projects: ["Project Gamma", "Project Delta"] },
      { id: 6, name: "Fiona", departmentId: 4, salary: 6000, projects: [] }, // Edge case: No projects
      { id: 7, name: "George", departmentId: 3, salary: 5200, projects: ["Project Epsilon", "Project Eta"] },
      { id: 8, name: "Helen", departmentId: 4, salary: 7200, projects: ["Project Theta"] },
      { id: 9, name: "Ian", departmentId: 2, salary: 4800, projects: ["Project Beta"] },
      { id: 10, name: "Jane", departmentId: 1, salary: 5100, projects: ["Project Alpha", "Project Theta"] },
   ];

   const totalProjects = new Set(employeesProjectsSource.flatMap(emp => emp.projects));
   console.log("task41:", totalProjects);

//  T-042: For each employee, find their department name and return an array of employee names with their department names.

   const empAndDepNames = employees.map(emp => {
      return `${emp.name}(${depMap[emp.departmentId]})`;
   });
   console.log("task42:", empAndDepNames);

//  T-043: Get a list of names of employees earning more than 6000.

   const empEarnsMoreThan6000 = employees.filter(emp => emp.salary > 6000).map(emp => emp.name);
   console.log("task43:", empEarnsMoreThan6000);   

//  T-044: Write a for-of loop to print the names of all employees from the employees array.

   console.log("task44:");
   for(let {name} of employees) {
      console.log(" ", name);
   }

//  T-045: Using a for-of loop, print the names of employees earning more than 5000.

   console.log("task45:");
   for(let {name, salary} of employees) {
      if(salary > 5000) console.log(" ", name);
   }

//  T-046: Modify the for-of loop to destructure each employee object and log their name and salary.

   console.log("task46:");
   for(let {name, salary} of employees) {
      console.log(`  ${name}: ${salary}`);
   }

//  T-047: Write a for-of loop to match employees with their departments and print the results.

   console.log("task47:");
   for(let {name, departmentId} of employees) {
      console.log(`${name} works in ${depMap[departmentId]}`);
   }

//  T-048: Use Array.prototype.entries() with a for-of loop to print the index and name of each employee.

   console.log("task48:");
   for(let pair of employees.entries()) {
      console.log(`  ${pair[0]}: ${pair[1].name}`);
   }

//  T-049: Given the array-like object below, access the second element and log it:

   const arrayLike = { 0: "First", 1: "Second", length: 2 };
   console.log("task49:", arrayLike[1]);

//  T-050: Write a function that takes a variable number of arguments and converts the arguments object into a real array using Array.from.

   function fun() {
      console.log("task50:", Array.from(arguments));
   }
   fun("one", "two", 3, 4);

//  T-051: Write a snippet to select all div elements on a webpage (using document.querySelectorAll) and convert the resulting NodeList into an array.

   const allDivElements = document.querySelectorAll("div");
   console.log("task51:", Array.from(allDivElements));

//  T-052: Merge these two arrays into a single array:

   const arr52 = [1, 2];
   const arr52a = [3, 4];
   const mergedArray = arr52.concat(arr52a);
   console.log("task52:", mergedArray);

//  T-053: Create an array of n duplicate values using Array.from. Input: Create an array with 5 "A" values. Output: ["A", "A", "A", "A", "A"]

   const nDuplicates = new Array(5).fill("A");
   console.log("task53:", nDuplicates);

//  T-054: Use Array.from to convert a string like "Hello" into an array of characters.

   const str = "Hello";
   console.log("task54:", Array.from(str));

//  T-055: For the array, ['apple', 'banana', 'apricot', 'mango', 'blueberry'], group words by their first letter using group().

   const fruits = ['apple', 'banana', 'apricot', 'mango', 'blueberry'];
   const groupedData = Object.groupBy(fruits, (fruit) => fruit[0]);
   console.log("task55:", groupedData);

//  T-057: From this array [3, 7, 3, 2, 3, 8, 7, 7], find the most repeated number. Hint: Use array method.

   const nums = [3, 7, 3, 2, 3, 8, 7, 7];
   const freq = nums.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
   }, {});

   let maxCount = 0;
   let mostRepNum = [];
   for(const num in freq) {
      if(freq[num] > maxCount) {
         maxCount = freq[num];
         mostRepNum = [num];
      }
      else if(freq[num] === maxCount) {
         mostRepNum.push(num);
      }
   }
   console.log(`task57: maxCount = ${maxCount}, mostRepNum = ${mostRepNum}`);

//  T-058: Find the median of [5, 2, 1, 3, 6, 8].

   const sortedArray = [5, 2, 1, 3, 6, 8].toSorted();
   function findMedian(a) {
      // odd
      if(a.length % 2 === 0) {
         let x = a.length / 2;
         let y = x - 1;
         return (a[x] + a[y]) / 2;
      }
      // even
      else return a[Math.floor(a.length / 2)];
   }
   console.log("task58:", findMedian(sortedArray));

//  T-059: Convert this array [['a', 1], ['b', 2], ['c', 3]], into { a: 1, b: 2, c: 3 } using array method(s).

   const ent = [['a', 1], ['b', 2], ['c', 3]];
   const entriesObj = Object.fromEntries(ent);
   console.log("task59:", entriesObj);

//  T-060: Flatten and convert all letters to uppercase in one step using flatMap(). Here is input array: [['a', 'b'], ['c', 'd']].

   const letters = [['a', 'b'], ['c', 'd']];
   const flatUppLetters = letters.flatMap(subArr => subArr.map(char => char.toUpperCase()));
   console.log("task60:", flatUppLetters);

//  T-061: Count the occurrences of each fruit in this array: ['apple', 'banana', 'apple', 'mango', 'banana', 'banana']

   const arr61 = ['apple', 'banana', 'apple', 'mango', 'banana', 'banana'];
   const fruitOccurrences = arr61.reduce((acc, fruit) => {
      acc[fruit] = (acc[fruit] || 0) + 1;
      return acc;
   }, {});
   console.log("task61:", fruitOccurrences);

//  T-062: Extract extract [‘b’, ‘c’, ‘d’] using slice() from this array: ['a', 'b', 'c', 'd', 'e']

   const arr62 = ['a', 'b', 'c', 'd', 'e'];
   const extractedFrom62 = arr62.slice(1, 4);
   console.log("task62:", extractedFrom62);

//  T-063: Sort the array [9, 3, 1, 6, 8] in ascending order using toSorted()

   const arr63 = [9, 3, 1, 6, 8];
   const sorted63 = arr63.toSorted();
   console.log("task63:", sorted63);

//  T-064: Reverse [1, 2, 3, 4, 5] using toReversed() and compare it with reverse()

   const arr64 = [1, 2, 3, 4, 5];
   const copyOf64 = arr64.toReversed();
   console.log("task64:", arr64, copyOf64);
   const modified64 = arr64.reverse();
   console.log("task64:", arr64, modified64);
   
//  T-065: Group the follwing array elements based on age(Adult vs Non-Adult):

   const users = [
      { name: 'Alice', age: 55 },
      { name: 'Bob', age: 3 },
      { name: 'Charlie', age: 25 },
   ];
   const ageCategorization = Object.groupBy(users, obj => obj.age >= 18 ? 'Adult' : 'Non-Adult');
   console.log("task65:", ageCategorization);
    
//  T-066: Find the longest word in this sentence using Array and Array methods: "40 Days of JavaScript by tapaScript is a powerful initiative".

   const sentence = "40 Days of JavaScript by tapaScript is a powerful initiative";
   const sentenceArr = sentence.split(" "); // string to array by cutting it everywhere there is a space
   const longestWord = sentenceArr.reduce((longest, current) => {
      return longest.length < current.length ? current : longest;
   }, "");
   console.log("task66:", longestWord); 

//  T-067: Find common elements between two arrays, [1, 2, 3, 4], [3, 4, 5, 6]

   const arr67 = [1, 2, 3, 4];
   const arr670 = [3, 4, 5, 6];
   const commonEl = arr67.filter(num => arr670.includes(num));
   console.log("task67:", commonEl);
   