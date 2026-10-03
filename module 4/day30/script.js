// Class
{
   class Car {
      // state/properties/attributes/characteristics
      constructor(modelName) {
         this.model = modelName;
      }

      // methods/function/action/behaviours
      drive() {
         console.log(`${this.model} is moving`);
      }
   }
   const car1 = new Car("BMW");
   const car2 = new Car("Audi");
   car1.drive();
   car2.drive();
   console.log(car1 === car2);   // false
   console.log(typeof Car);   // function 
}

// Class as Expression 
{
   const Employee = class {
      welcome() {
         console.log("Hello Employee");
      }
   }
   const emp = new Employee;
   emp.welcome();
}

// Class Fields 
{
   class Phone {
      brand = "Apple"
      make() {
         console.log(this.brand);
      }
   }
   const phone = new Phone;
   phone.make();
}

// Getter & Setter 
{
   class User {
      constructor(name, age, email) {
         this._name = name;
         this._age = age;
         this._email = email;
      }

      get name() {
         return this._name.toUpperCase();
      }
      get age() {
         return this._age;
      }

      set age(age) {
         if(age < 0) {
            console.log("Negative age is not allowed!");
            return;
         }
         this._age = age;
         console.log("Age set to", age);
      }
   }
   const user1 = new User('Alex', 22, 'alex@gmail.com');
   console.log(user1.name);
   user1.age = 22;
   console.log(user1.age);
}

// Static Members
{
   class Human {
      static greet() {
         console.log("Hello I am human.");
      }

      constructor(name, age) {
         this.name = name;
         this.age = age;
      }
   }
   const h1 = new Human('Shah', 42);
   const h2 = new Human('Ali', 23);
   Human.greet();
}

// private & public 
{
   class BankAccount {
      #balance;
      constructor(name, initialBalance) {
         this.name = name;
         this.#balance = initialBalance;
      }

      get balance() {
         return this.#balance;
      }
   }
   const acc = new BankAccount('ICIC', 200);
   console.log(acc.name);
   console.log(acc.balance);
}

// Extending Class 
{
   class Human {
      constructor(name, age) {
         this.name = name;
         this.age = age;
      }

      introduce() {
         console.log(`Hi, I am ${this.name}, I am ${this.age} years old`);
      }

      sleep() {
         console.log(`${this.name} is sleeping`);
      }
   }

   class Student extends Human {
      constructor(name, age, grade) {
         super(name, age);
         this.grade = grade;
      }
      introduce() {  // override parent
         console.log(`Hi, I am ${this.name}, I am ${this.age} years old studying in ${this.grade} grade.`);
      }
      // sleep() inherited from parent
   }
   class Teacher extends Human {
      constructor(name, age, subject) {
         super(name, age);
         this.subject = subject;
      }
      introduce() {  // override parent
         console.log(`Hi, I am ${this.name}, I am ${this.age} years old studying in ${this.subject} subject.`);
      }
      // sleep() inherited from parent
   }
   
   const student1 = new Student('John', 17, 12);
   const teacher1 = new Teacher('Tiwari', 50, 'Chemistry');
   student1.introduce();
   student1.sleep();
   teacher1.introduce();
   teacher1.sleep();
}

// Composition 
{
   class Engine {
      start(model) {
         console.log(`${model}'s Engine has started.`)
      }
   }

   class Car {
      constructor(model) {
         this.model = model;
         this.engine = new Engine();   // car 'has an' engine
      }
      startEngine() {
         this.engine.start(this.model);
      }
   }

   const car = new Car("BMW");
   car.startEngine();
}