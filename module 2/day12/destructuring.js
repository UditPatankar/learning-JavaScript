const getStudent = () => {
   return {
      'name' : 'John Doe',
      'age': 9,
      'std': 3,
      'subjects': ['Math', 'Science', 'English'],

      'parents': {
         'father': 'David Doe',
         'mother': 'Rita Doe',
         'email': 'john-parent-email.gmail.com'
      },
      'address': {
         'city': 'New York',
         'country': 'USA',
         'zip': 5766
      }
   }
};

const student = getStudent();

// const name = student.name;
// const age = student.age;

// destructuring
const {name, age, address: {city, country}} = student; // JS creates the variable these variables & put the values from obj in this variables
console.log(name, age, city, country);

// Aliases 
const {std: standard} = student;                      // Js will create an variable 'standard'  put value from 'std' in it
console.log(standard); // 3

// aliases with nested destructuring
const {parents: {father: fatherName, mother: motherName}} = student;
console.log(fatherName, motherName);

// creating a new variable 
const {name: studentName, meal="Bread"} = student;    // *note this won't creat any any property in student, we are just creating a normal variable here
console.log(studentName, meal);

// dynamic value to a new variable
const {subjects, noOfSubjects = subjects.length} = student;
console.log(noOfSubjects);

// Destructuring to function parameters

// normal way of doing it -
/* 
function getEmail(student) {
   console.log(student.parents.email);
} 
*/

function getEmail({parents: {email}}) {
   console.log(email);
}

getEmail(student);

// Destructuring a function return value
const {name: anotherName, parents: {email: anotherParentEmail}} = getStudent();
console.log(anotherName, anotherParentEmail);

// Destructuring in loop
const students = [
   {
      'name': 'Rahul',
      'grade': 'A'
   },
   {
      'name': 'Riya',
      'grade': 'A'
   },
   {
      'name': 'Jyoti',
      'grade': 'B'
   }
];

for(let {name, grade} of students) {
   console.log(name, grade);
}
