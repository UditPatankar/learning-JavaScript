// if else chaining problem
function calculateDiscount(total) {
   let discount = 0;

   /* if (total >= 100) {
      discount = 0.10;
   } else if (total >= 300) {
      discount = 0.15
   } else if (total >= 500) {
      discount = 0.20;
   } */

   // when you are checking a value using if else chain, always start with higher value
   if (total >= 500) {
      discount = 0.20;
   } else if (total >= 300) {
      discount = 0.15
   } else {
      discount = 0.10;
   }

   return total - total * discount;
}

console.log(calculateDiscount(50));
console.log(calculateDiscount(150));
console.log(calculateDiscount(350));
console.log(calculateDiscount(600));

// Closure confusion problem
function createButtons() {
   const buttons = [];

   // since var is function scoped & not block scoped, it leaks at the beginning only & sits at the function scope
   // and since each iteration uses i, it forms closure with the fucntions scope & therefore any changes by the ieration affects that single i (the one in functions scope)
   // so by the end of the loop i value is 4 & there for when the buttons functions try to access i they all get the same value.   

   // solution: use let - which is block scoped, so each iteration creates a new block scope having it's own i

   for (var i = 1; i <= 3; i++) {
      buttons.push(function() {
         console.log(`Button ${i}.`);
      });
   }
   return buttons;
}

const [btn1, btn2, btn3] = createButtons();
btn1();
btn2();
btn3();

// 'this' with arrow vs regular function
const user = {
   name: 'Alex',
   clicks: 0,

   // coz you have used arrow function which inherits 'this' from its parents, in this case 'this' refers to window object.
   // solution: use regular function, coz 'this' inside regular function binds to whichever object it is called
   // since you will call it on user it binds to user object

   updateClicks: () => {
      document.getElementById("btn").addEventListener("click", () => {
         this.clicks++;
         console.log(`${this.name} has clicked the button ${this.clicks} times.`)
      });
   }
}
user.updateClicks();