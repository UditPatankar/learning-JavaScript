// Iterative methods -

const customers = [
  {
    id: 1,
    firstName: "Abby",
    lastName: "Thomas",
    gender: "F",
    isMarried: true,
    age: 32,
    expenses: 500,
    purchased: ["Shampoo", "Toys", "Book"]
  },
  {
    id: 2,
    firstName: "Jerry",
    lastName: "Tom",
    gender: "M",
    isMarried: false,
    age: 24,
    expenses: 150,
    purchased: ["Stick", "Blade", "Book"]
  },
  {
    id: 3,
    firstName: "Dianna",
    lastName: "Cherry",
    gender: "F",
    isMarried: true,
    age: 80,
    expenses: 1200,
    purchased: ["Laptop", "Mouse"]
  },
  {
    id: 4,
    firstName: "Dev",
    lastName: "Sharma",
    gender: "M",
    isMarried: true,
    age: 65,
    expenses: 80,
    purchased: ["Groceries"]
  },
  {
    id: 5,
    firstName: "Kamal",
    lastName: "Khan",
    gender: "M",
    isMarried: false,
    age: 19,
    expenses: 320,
    purchased: ["Headphones", "Phone Case", "Book"]
  }
];

   // filter() - has an test function that takes each (elements, index, arrItself) & 
   // only the elements for which the test function returns true are included in a new array
   
   const seniorCustomers = customers.filter((customer) => {
      return customer.age >= 60;
   });

   console.log("filtered array:", seniorCustomers);

   // map() - has an tranformation function that takes each (currentValue, index, arrItself) &
   // do some transformation/modifications on them & put them in a new array
   
   const customersWithFullName = customers.map((customer) => {
      const {firstName, lastName, gender, isMarried} = customer;
      let title = "";

      if(gender === "M") { title = "Mr."; }
      else if(gender === "F" && isMarried === true) { title = "Mrs.";  }
      else { title = "Miss"; }

      customer["full_name"] = `${title} ${firstName} ${lastName}`;
      return customer;
   });

   console.log("mapped array:", customersWithFullName);

   // reduce() - has an reducer function, reduces an array to single value/result
   // reduceRight() - starts from right to left
   
   // arr.reduce( reducer (accumulator, currVal, index, arr), initialVal );

   /* reducer(accumulator, currVal, index, arr) {
      // you do something with accumulator & currentVal-> you return the result, 
      // now for the next iteration, this result will be accumulator's value
   } */

   const arr = [1, 2, 3, 4];
   const result = arr.reduce((accumulator, currentVal) => {
      return accumulator + currentVal;
   }, 0);   // if you omit initialization, acc gets a[0] & iteration starts from a[1]

   console.log("reduced result:", result);
   
   // apply it on customers & calculate the average age of customers who bought the book
   // we have used accum as an object here, 
   // *remember on every iteration the returned value is assigned to accumulator
   const {sum, count} = customers.reduce( 
      (acc, customer) => {

         if(customer.purchased.includes("Book")) {
            // update acc properties
            acc.count++;
            acc.sum += customer.age;
         }
         return acc; // return modified acc
      
      },
      {sum: 0, count: 0}   // initilaized acc as object
   );

   console.log("average age of customers bought a book:", Math.floor(sum/count));

   // some() - returns true even if function returns true even for one element
   const hasTeenagers = customers.some((customer) => {
      return customer.age < 20;
   });
   console.log("do we have teenage customers:", hasTeenagers);

   // every() - returns true only if function returns true for every element
   const areAllMarried = customers.every((customer) => {
      return customer.isMarried;
   });
   console.log("are all cusomters married", areAllMarried);

   // find() - returns the "first element" for which function returns true
   const foundYoungCustomer = customers.find((customer) => {
      return customer.age < 25;
   });
   console.log("young customer:", foundYoungCustomer);

   // findIndex() - similar but it returns the index
   const youngCustomerIndex = customers.findIndex((customer) => {
      return customer.age < 25;
   });
   console.log("young customer's index:", youngCustomerIndex);

   // findLast() - returns the "last element" for which function returns true
   const foundYoungCustomerLast = customers.findLast((customer) => {
      return customer.age < 25;
   });
   console.log("young customer:", foundYoungCustomerLast);

   // findIndex() - similar but it returns the index
   const youngCustomerIndexLast = customers.findLastIndex((customer) => {
      return customer.age < 25;
   });
   console.log("young customer's index:", youngCustomerIndexLast);


// Method Chaining -
// Get the total amount spent by married customers

   // find married customers
   const totalAmount = customers.filter((customer) => {
      return customer.isMarried; 
   })
   .map((customer) => {
      return customer.expenses;
   })
   .reduce((acc, expense) => {
      return acc + expense;
   }, 0);
   console.log("total amount spent by married customers:", totalAmount);

// forEach() - iterate in the array & perform you logic, it do not return any new array
   const nums = [1, 2, 3, 4, 5];
   let prod = 1;
   nums.forEach((x) => {
      prod *= x;
      console.log(x, "->", prod);
   });

// entries() - returns an Array Iterator Object that contains [key, value] pairs for each index
   const alp = ['a', 'b', 'c', 'd'];
   // const arrItr = alp.entries();
   // console.log(alp.entries());
   // console.log(arrItr.next().value);   // [0, 'a']
   // console.log(arrItr.next().value);   // [1, 'b'] 

   for(let arr of alp.entries()) {
      console.log(arr[0], arr[1]);
   }
   for(let [i, value] of alp.entries()) { // or destructure the array
      console.log(i, value);
   }

// values() - also returns an Array Iterator Object but it only contains values & not index

   for(let val of alp.values()) {
      console.log(val);
   }

// flatMap() - does the map work first then, flats it

const a = [1, 2, 3, 4];

console.log("simple map:", a.map((item) => item*2));
console.log("simple flatMap:", a.flatMap((item) => item*2));

console.log("complex map:", a.map((item) => [[item*2]]));
console.log("complex flatMap:", a.flatMap((item) => [[item*2]])); // only does one flattening