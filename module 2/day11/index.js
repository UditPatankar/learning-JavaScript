// CLOSURES - when function is "defined(created)" it gets a "permanent" link to it's outer lexical environment, 
// even after the outer function's EC is popped off 
// meaning : 
// when a function is created it gets a permanent link [[Scope]] to it's outer scope / lexical env
// now even if the outer function has finished it's execution, the inner function has still kept it's(outer) lexical env alive
// * note this link sets up only once, at creation time not on every call.

console.log("Case 1: GEC");
// Case 1: GEC - outer scope only created once
// Since the whole script runs inside GEC, and GEC is only created once at the very start
// so any function now matter how deep it is nested, it will eventually reach this same GEC (global lexical env)
// means if any function do the change in this GEC env. every other function will have this update
// why? coz everyone has this same GEC

   // global env
   let a = 0;
   function test() { // got link to GEC at time of creation only  
      a++;
      console.log(a);
   }
   test(); // EC1 created pointing to same global env (a:0) - 1, EC1 pops out
   test(); // EC2 created pointing to same global env (a:1) - 2, EC2 pops out
   // * notice for each call brand new EC got created, but each EC is pointing to same GEC it got linked to "at time of creation"


console.log("Case 2: Function call -> new outer scope");
// CASE 2: fresh outer scope for each call

   // example 1- 
   console.log("  example 1");
   function outer() {
      // outer env
      let x = 0;

      function inner() {
         x++;
         console.log(x);
      }
      inner();
   }

   outer(); // EC1 - means new lexical env(x:0), this inner has link to EC1 env - op 1
   outer(); // EC2 - means new lexical env(x:0), this inner has link to EC2 env - op 1

   // example 2- """the real closure""" - 
   console.log("  example 2");
   
   function makeCounter() {
      // outer env
      let y = 0;

      return function() { // this return keeps outer env(of current call) alive
         y++;
         console.log(y);
      }
   }

   let counter1 = makeCounter(); // EC1 - means new outer env LE1(y:0), and inner function (counter1) is linked to this LE1
   let counter2 = makeCounter(); // EC2 - means new outer env LE2(y:0), and inner function (counter2) is linked to this LE2

   // if you observe carefully the above two, 
   // when EC1 got created, the inner got created for this context(EC1) and got linked to EC1's lexical env LE1
   // when EC2 got created, the inner got created for this context(EC2) and got linked to EC2's lexical env LE2
   // means there are two inner functions counter1 & counter 2 each having their own separate EC & pointing to two diff EC1, EC2

   // *** counter1 → holds the "heap address" of the inner function object.
   // That inner function object → holds [[Scope]], a pointer to the Lexical Environment 
   // that was built during EC1 (i.e., LE1, containing y).

   // *** INNER FUNCTION WILL FORM CLOSURE EACH TIME THE "OUTER FUNCTION" IS CALLED, means on inner functions creation NOT on inner function's call 

   counter1(); // will affect only the EC1's env (y:0) -> 1
   counter1(); // (y:1) -> 2

   counter2(); // will affect only the EC2's env (y:0) -> 1

// THE WHOLE PICTURE - 
// Closure totally depends on outer function's call & inner function's creation
// means outer() -> inner create -> closure formed with outer env & this closure(with outer env) is locked for this particular call
// you call outer() again -> new inner -> closure
// so we can say closure is specific to outer execution context
// therefore every toplevel function forms closure only once, GEC only gets created/called once

// Real World Example - 
console.log("Create Bank Account -");

let bankName = "Global Bank"; // Case 1: single, shared scope (GEC)

function createAccount(owner) {
  let balance = 0; // Case 2: fresh scope, new closure on every outer call

  return {
    deposit: function(amount) {
      balance += amount;
      console.log(owner, "deposited at", bankName,". Balance: ", balance);
    },
    checkBalance: function() {
      console.log(owner, " balance: ", balance);
    }
  };
}

let aliceAccount = createAccount("Alice"); // call #1 → own private `balance`
let bobAccount = createAccount("Bob");     // call #2 → own private `balance`, unrelated to Alice's

aliceAccount.deposit(100); // Alice deposited at Global Bank. Balance: 100
aliceAccount.deposit(50);  // Alice deposited at Global Bank. Balance: 150
bobAccount.deposit(20);    // Bob deposited at Global Bank. Balance: 20

aliceAccount.checkBalance(); // Alice's balance: 150
bobAccount.checkBalance();   // Bob's balance: 20