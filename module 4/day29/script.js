// What is OBJECT?
/* 
- Object represents real-world entity.
- If something can be described with characteristic & behaviour, it can be turned into an object.
- Characterisctics are also called state/properties/attributes
- Behaviours are know as methods/functions/actions
*/
   {
      const user = {
         // state 
         name: 'Alex',
         age: 22,
         // method
         walk: function() {
            console.log(`${this.name} is walking`);
         }
      }
      user.walk();
   }

// What is CLASS?
/* 
- When you have a blueprint for an house which defines the house strucure once
   then you can create as many physical house from that blueprint, each house can have diff colors, furniture etc but structure remains same
- A class is a template/blueprint used to create an objects. 
- Instead of writing object literals manually, you define the structure of the object once using class & 
   instantiate multiple unique objects with the 'new' keyword
*/
   {
      class Person {
         // constructor is a special method inside the class, that runs automatically when you create a instance using 'new' keyword
         // & sets the initial state of the object
         constructor(name, age) {
            this.name = name; // 'this' refers to the instance being created
            this.age = age;
         }

         // Behavior / Method shared by instances
         greet() {
            console.log(`Hi, I am ${this.name} and I am ${this.age} years old.`);
         }

         // inside the instance method you can access or modify the instance properties using 'this' keyword
         createBirthday() {
            this.age += 1;
            console.log(`Happy Birthday! ${this.name} is now ${this.age} years old.`);
         }
      }

      const person1 = new Person('Alex', 22);
      person1.greet();
      person1.createBirthday();
   }

   // getter & setter 
   {
      class User {
         constructor(username) {
            // we store actual data in _username (internal convention)
            this._username = username;
         }

         // Getter: runs whenever you READ username instance.username
         // and gives a nice clean formatted version w/o mutating actual data
         get username() {
            return `@${this._username.toLowerCase()}`;
         }

         // Setter: runs whenever you TRY TO CHANGE instance.username = 'newUserName'
         // and validates before changing the actual data
         set username(newUsername) {
            if(newUsername.length < 3) {
               console.log("Error username must at least 3 characters");
               return;
            }
            this._username = newUsername;
            console.log("username updated!")
         }
      }
      const user1 = new User("Hari");
      console.log(user1.username);  // @hari
      user1.username = "Om";  // failed
      console.log(user1.username); // @hari
      user1.username = 'HARI_OM';   // username updated!
      console.log(user1.username); // @hari_om
      console.log(user1._username); // HARI_OM
   }

   // static methods & properties - It belongs to the class itself rather than to individual instances(objects) created from class itself
   {
      class User {
         // static properties
         static appName = "My App";
         static userCount = 0;

         constructor(name) {
            this.name = name;
            User.userCount++; // increment total user whenver new instance is created
         }

         // static methods (Utility function)
         static compareAges(userA, userB) {
            return userA - userB;
         }
      }

      const user1 = new User('Ahem');
      const user2 = new User('Alam');
      console.log(User.appName);
      console.log(User.userCount);
      console.log(User.compareAges(24, 20));
      console.log(user1.appName); // undefined, instances do not have access to static members
   }

// private fields - using #prefix, provides a true language-privacy. They are compeltely hidden & inaccessible outside the class
{
   class BankAccount {
      // decalre private fields at the top of the class body
      #pin;

      constructor(owner, pin) {
         this.owner = owner;
         this.#pin = pin;  // private property
      }

      verifyPin(enteredPin) {
         return this.#pin === enteredPin;
      }
   }
   const acc1 = new BankAccount('Udit', 321);
   console.log(acc1.owner);
   console.log(acc1.pin);  // undefined
   console.log(acc1.verifyPin(321));   // true
}

// 4 Pillars of OOPS -

// ABSTRACTION - means hidding the complex internal features & only show what is essential
{
   class CoffeeMachine {
      // this is the abstract that user directly uses
      makeCoffee() {
         this.#boilWater();
         this.#brewGrind();
         console.log("Coffee is ready! :)");
      }

      // this are hidden internal steps
      #boilWater() {
         console.log("Water is boiling...");
      }
      #brewGrind() {
         console.log("Brewing coffee...");
      }
   }
   const myMachine = new CoffeeMachine();
   myMachine.makeCoffee();
}

// ENCAPSULATION - means bundling data/properties & methods/functions in a single unit (an object/class)
// & restricting direct access to internal state
{
   class BankAccount {
      // encapsulated data
      #balance;

      constructor(initialBalance) {
         this.#balance = initialBalance;
      }

      // Controlled method to deposit money
      deposit(amount) {
         if(amount <= 0) {
            console.log("Amount must be positive");
            return;
         }
         this.#balance += amount;
         console.log(`Deposited: $${amount}`);
      }

      // Controlled methos to withdraw money
      withdraw(amount) {
         if(amount > this.#balance) {
            console.log("Not enough balance");
            return;
         }
         this.#balance -= amount;
         console.log(`Withdrew: $${amount}`);
      } 

      // Ready-only getter 
      get balance() {
         return this.#balance;
      }
   }
   const account = new BankAccount(100);
   console.log(account.balance);
   account.deposit(200);
   console.log(account.balance);
   account.withdraw(100);
   console.log(account.balance);
}

// 3. INHERTANCE - Inheritance allows a class (child/subclass) to inherit properties and methods from another class (parent/superclass). 
// This helps reuse code and create hierarchical relationships without duplicating logic.
{
   class Animal {
      constructor(name) {
         this.name = name;
      }

      eat() {
         console.log(`${this.name} says eating.`);
      }
   }

   // Child Class extending Parent Class
   class Dog extends Animal {
      constructor(name, breed) {
         // Call the parent constructor 
         super(name);
         this.breed = breed;
      }

      // Unique method specific to dog
      bark() {
         console.log(`${this.name} says Woof!`);
      }
   }
   const myDog = new Dog('Buddy', 'Golden Retriever');
   myDog.eat();
   myDog.bark();
   console.log(myDog.breed);
}

// 4. POLYMORPHISM - Polymorphism comes from Greek meaning "many forms". In OOP, 
// it allows different classes to share the same method name, but each class provides its own customized implementation.
/* Real-World Analogy:
Think of a "Play" button on a remote control or app interface:
Pressing play on a video player plays a video.
Pressing play on an audio player plays music.
Pressing play on a game launcher launches a game.
The action (play()) is the same, but the outcome depends on which object receives the command. */
{
   // Parent Class
   class Shape {
   calculateArea() {
      return 0;
   }
   }

   // Child Class 1
   class Circle extends Shape {
   constructor(radius) {
      super();
      this.radius = radius;
   }

   // Override parent method
   calculateArea() {
      return Math.PI * this.radius ** 2;
   }
   }

   // Child Class 2
   class Rectangle extends Shape {
   constructor(width, height) {
      super();
      this.width = width;
      this.height = height;
   }

   // Override parent method
   calculateArea() {
      return this.width * this.height;
   }
   }

   // Using Polymorphism:
   const shapes = [
   new Circle(5),
   new Rectangle(4, 6)
   ];

   // We can loop through all shapes and call calculateArea() 
   // without needing to know the specific type of shape beforehand!
   shapes.forEach((shape) => {
   console.log(shape.calculateArea());
   });

   // Output:
   // 78.53981633974483 (Circle area)
   // 24                (Rectangle area)
}

// COMPOSITION -
// An design principle where once class can contain or is composed of one or more objects of other classes 
// 'to reuse their functionality' instead of inheriting from them. (coz JS do not suppose multiple inheritance, means a class can onl  extend one parent class)
// • Inheritance represents an "Is-a" relationship (e.g., a Dog is an Animal).
// • Composition represents a "Has-a" or "Uses-a" relationship (e.g., a Car has an Engine, or a User has a Logger). You plug in other objects to reuse their functionality.
