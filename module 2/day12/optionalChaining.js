// Optional Chaining - 

let employee = {
   'address': {
      'city': 'Mumbai',
      'country': 'India'
   }
};

console.log(employee.address.city); // Mumbai
console.log(employee.address.state); // undefined, no error program runs fine
// console.log(employee.address.state.zip); // type error, undefined.zip
console.log(employee.address.state?.zip); // undefined

