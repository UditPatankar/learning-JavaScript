// Object Literals:
{
   const user = {
      'name': 'Alex',
      'address': {
         'city': 'Bhopal',
         'country': 'India'
      },
      'age': 32,
      'unique-number': 'A0321'
   }
   console.log(user.name);
   console.log(user['unique-number']);
}

// Objects & const keyword: variables holds the reference not actual object
{
   const count = 10;
   // count = 20; // not allowed!
   console.log(count);

   const user = {
      'name': 'Alex',
      'age': 32,
      'unique-number': 'A0321'
   } 
   user.name = 'Bob'; // allowed
   console.log(user.name);
   // user = {}; // not allowed!
}

// JS function vs method
{
   function fun() {
      console.log("function: I am function");
   }
   const user = {
      'name': 'Cho',
      'greet': function() {
         console.log(`method: Hey I am ${this.name}`);
      }
   }
   fun();
   user.greet();
}

// Constructor function:
{
   function Car(model, year, color) {
      this.model = model,
      this.year = year,
      this.color = color,
      this.wheelNumber = function() {
         return 4;
      }
   }
   const car1 = new Car('BMW', 2024, 'Black');
   console.log(car1.wheelNumber());
}

// Composing Objects & References
{
   function Car(model, color, year, owner) {
      this.model = model,
      this.color = color,
      this.year = year,
      this.owner = owner
   }
   function Owner(name, age) {
      this.name = name,
      this.age = age
   }
   const owner1 = new Owner('Alex', 30);
   const car1 = new Car('Audi', 'Blue', 2003, owner1);
   console.log(car1);

   owner1.age = 32;
}

// Object Prototypes & Prototype Chain:
/* 
In JavaScript, prototypes are the mechanism by which objects inherit features and share functionality from one another. 
JavaScript uses a prototype-based object model rather than a classical class-based model, 
meaning that objects themselves act as the blueprints for other objects.

Every JavaScript object has an internal, hidden link to another object called its prototype 
(often referred to in specifications as [[Prototype]]).

The Prototype Chain: When you try to access a property or method on an object, JavaScript first looks at the object itself. 
If it doesn't find it there, it climbs up the prototype chain to check the object's prototype, 
and continues until it either finds the property or hits null.
*/
{
   // 1. THIS IS A CONSTRUCTOR FUNCTION (A blueprint factory)
   // Think of this function as a factory machine. It is NOT the parent of car1.
   // Instead, it is just the tool used to assemble car1.
   function Car(model, color, year, owner) {
      this.model = model;
      this.color = color;
      this.year = year;
      this.owner = owner;
      
      // WARNING: This recreates a brand new function in memory for every single car.
      this.wheelNumber = function() {
         return 4;
      };
   }

   // 2. CREATING AN INSTANCE
   // The 'new' keyword creates a blank object, sets its internal parent link 
   // ([[Prototype]]) to Car.prototype, and then runs the Car() factory on it.
   const car1 = new Car('BMW', 'White', 2023, {});
   
   console.log(car1); 
   // Output: Car { model: 'BMW', color: 'White', year: 2023, owner: {}, wheelNumber: [Function] }


   // 3. LET'S CLEAR UP THE "WHO CREATED WHOM" CONFUSION:
   
   // WRONG UNCLEAR THOUGHT: "car1 is created from prototype Car & Car is created from Object"
   // CORRECT CLEAR THOUGHT: 
   // - car1's dynamic backup parent is the object called 'Car.prototype'.
   // - 'Car.prototype's backup parent is 'Object.prototype'.
   // - 'Object.prototype's backup parent is null (the end of the chain).

   // [[Prototype]]: Object -> car1's dynamic backup
      // constructor: ƒ Car(model, color, year, owner) -> tool used to created car1
      // [[Prototype]]: Object -> 'Car.prototype's backup parent

   // 4. THE PROTOTYPE PROPERTIES LOGS EXPLAINED:

   console.log(car1.prototype); 
   // Output: undefined
   // WHY? Instances (like car1) DO NOT HAVE a '.prototype' property! 
   // Only functions have a '.prototype' property. 
   // To see car1's actual parent link, you must use: Object.getPrototypeOf(car1)

   console.log(Car.prototype); 
   // Output: { constructor: f Car() }
   // WHY? This is an empty warehouse object that JavaScript automatically created 
   // when you defined the function Car(). 
   // ANY property or method you put inside this warehouse will be instantly 
   // shared with car1, car2, car3, etc., via the prototype chain.

   
}
{
   function Car(model, color, year, owner) {
      this.model = model;
      this.color = color;
      this.year = year;
      this.owner = owner;
   }

   // Attach on the top prototype, no need to create for each instance
   Car.prototype.getDetails = function() {
      return `This is a ${this.color} ${this.model}.`; 
   }
   const car1 = new Car('BMW', 'White', 2023, {});
   const car2 = new Car('Audi', 'Red', 2014, {});
   console.log(car1);
   console.log(car2);
   console.log(car1.getDetails());
   console.log(car2.getDetails());
}

// Class Pattern: this block is just an sysyntax sugar above block
{
   class Car {
      // 1. The constructor function (the data factory)
      constructor(model, color, year, owner) {
         this.model = model;
         this.color = color;
         this.year = year;
         this.owner = owner;
      }

      // 2. Prototype method (Attached to the top prototype automatically!)
      // No 'function' keyword needed, and NO memory waste per instance.
      getDetails() {
         return `This is a ${this.color} ${this.model}.`; 
      }
   }

   // 3. Creating instances remains exactly the same
   const car1 = new Car('BMW', 'White', 2023, {});
   const car2 = new Car('Audi', 'Red', 2014, {});

   console.log(car1.getDetails()); // "This is a White BMW."
   console.log(car2.getDetails()); // "This is a Red Audi."
}