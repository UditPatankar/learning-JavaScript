console.log("Day 12 -");

// * note that object do not have any lexical env/scope, they are just created in execution phase of EC(can be global or function's context)
   // the object properties do not acts like variables, they are just value & can be accessed only with object 
   // * object vs block - objects do not have scope but blocks do, but block still doesn't have any exe context
   // the lexical env of block is built inside it's parent env(parent exe context) such as GEC[global env [block env]] nested inside global env


// OBJECTS - an collection of key:value pairs, represents real world entities or grouped data
// lives in heap

   let user = {                     // user holds the heap address this object
      name : "Udit",
      age: 22,
      "is admin": true              // " " for keys with space/characters
   };

   console.log(user.name);          // dot notation 
   console.log(user["is admin"]);   // bracket notation for keys with space/characters or dynamic key

   // add property
   user.isAdult = true;
   user["is adult"] = true;

   // modify/delete property
   user["is admin"] = false;
   delete user.isAdult;

   console.log(user);

// Accessing Dynamic Key Value - 

   let someKey = "age";             // suppose you are receiving the key dynamically
   // console.log(user.someKey);    // if u do this js will think user has a property 'someKey'
   console.log(user[someKey]); 

// Creating a key dynamically - 

   let car = "BMW";

   let favCar = {
      [car]: 5
   };

   console.log(favCar);

// Constructor Function - 
   function Car(name, model) { // you are creating an custome custom type
      this.name = name;
      this.model = model;
   }

   const car1 = new Car("BMW", "X1");
   console.log(car1);
   const car2 = new Car("Audi", "R8");
   console.log(car2);                     // car1 & car2 both are objects of Car type (custom)

// new Object()
   const person = new Object(); // this is JS built-in Object, & person is Object type
   person.name = "Tom";
   person.age = "20";
   console.log(person);

// factory function 
   function createUser(name, access) {
      return {
         name, 
         access,
         greet: function() {
            console.log(`Hello, ${this.name}. Welcome to the system.`);
         }
      }
   }

   const admin = createUser("Raj", "allowed");
   console.log(admin);
   admin.greet();

// Nested Object -

   let profile = {                     // profile holds pointer to object in heap
      name: "David",
      company: "Amazon",
      
      address: {                       // address holds pointer to object in heap
         city: "Mumbai",
         state: "Maharashtra",
         country: "India",
         greet: function() {                // greet holds pointer to function body in heap & this function is linked to global env (coz that is the first outer env in this case)
            console.log(`Welcome to ${profile.address.city}, ${profile.name}`);   // since objects have no env so JS goes to the closest env it finds, global in this case & looks for profile > address > city & profile > name
         }
      },
      salary: undefined
   }

   console.log(profile.address);
   profile.address.greet();
   if(!profile.salary) console.log("salary do not exist!");
   // 'in' operator
   if("salary" in profile) console.log("salary exist!") // check property existence - true

// for in loop -
   for(key in profile) {
      console.log(key, "=", profile[key]);
   }

// get all the keys -
   console.log(Object.keys(profile));                 // returns array of all the keys of profile object

// Object Reference - 
   let fruit = { name: "tomato", quantity: 12 };      // X001
   let vegetable = { name: "tomato", quantity: 12 };  // Y001

   console.log(fruit == vegetable); // false
   fruit = vegetable; // now both are poting to Y001

// Static Methods - 

   // 1. Object.assign() & structuredClone()
      const target = {a:1, b:2};
      const source = {a:3, q:4};

      const retObj = Object.assign(target, source); // assign() will copy from source to target
      console.log(retObj);                         // overrided the target 'a'

      const obj = { name: "Jade" };
      const newObj = Object.assign({}, obj);       // copy from obj to {}
      console.log(newObj);

      const sourceObj = {
         x: 1,
         y: { z: 2 }    // XX01, note: y is holding a reference here
      }
      
      // Shallow copy - object reference get copied

      const obj2 = Object.assign({}, sourceObj);  // now obj2 also holds y: XX01
      obj2.x = 0;
      obj2.y.z = 3;                          // this does changes in object at XX01

      console.log(sourceObj);   // { x: 1, y: { z: 3 } }
      console.log(obj2);   // { x: 0, y: { z: 3 } }

      // Deep copy - object itself get copied

      const obj3 = structuredClone(sourceObj);
      obj3.x = 100;
      obj3.y.z = 200;

      console.log(sourceObj);
      console.log(obj3);

   // 2. Object.entries() - object to array

      let myObj = {
         name: "Udit",
         age: 22
      }
      let myArr = Object.entries(myObj);
      console.log(myArr);

   // 3. Object.fromEntries() - array to object

      let entriesArr = new Map([
         ["foo", "bar"], 
         ["buzz", 42]
      ]);
      let entriesObj = Object.fromEntries(entriesArr);
      console.log(entriesObj);

   // 4. freez() & seal() - freeze: u cannot do any changes, seal: you can only modify the existing property
   
   const emp = {
      salary: 100
   }
   Object.freeze(emp);

   emp.salary = 200;
   emp.dep = "finance";
   console.log(emp);

   const emp2 = {
      salary: 100
   }
   Object.seal(emp2);

   emp2.salary = 200;
   emp2.dep = "finance";
   console.log(emp2);

   // 5. hasOwn() - returns true if it has a property
   console.log(Object.hasOwn(emp2, "salary"));
