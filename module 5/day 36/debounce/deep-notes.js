// What is performance? Why is it important?
/* 
Performance simply means how your application loads, runs & responds to user interaction. It is measured in terms of these key concepts
- Efficiency : How well your code achieves the goal w/o wasting computational power (simply only necessary computations)
- Resource Usage : How much memory, CPU, network bandwidth your application consumes.
- Responsiveness : How quickly the UI reacts to user actions
- Scalability : How gracefully the application's performance holds up as the data size, traffic, component complexity grows

Why it matters: a slow app frustrates users, wastes their battery/data, & a laggy UI feels broken even if the logic is correct.
*/

// Performance Optimization Techniques

// 1. DEBOUNCING -
// It simply delays the execution of a function until a specific amt of time is elapsed since the last time the event was triggered
// & if the event fires again before the last timer is elapsed, the timer resets

// WHY do we need it?
// Events like input, scroll, resize can fire dozens of times per second. If each one runs expensive work
// (filtering a big list, calling an API, re-rendering the DOM) we waste CPU/network on results the user never even sees.
// Debounce = "wait until the user pauses, then run only once".
// Typical uses: search box, window resize, auto-save, form validation.

// THE 3 IDEAS that make debounce work (everything below is just these 3):
// 1. CLOSURE      -> `timer` lives in the outer function & is shared by every call of the returned inner function
// 2. clearTimeout -> cancels a call that was SCHEDULED but has not run yet (nothing "undoes" anything, the old call just never runs)
// 3. this & args  -> the real function runs later (inside setTimeout), so we must carry the right `this` and arguments to it manually using fn.apply(this, args)

// *note: to understand the code think it in 2 parts - 1. the setup when script loads( where the function chain ends? ) & 2. follow the setup when event occurs
const countries = [
  'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 
  'Canada', 'China', 'Denmark', 'Egypt', 'Finland', 
  'France', 'Germany', 'Greece', 'India', 'Indonesia', 
  'Ireland', 'Italy', 'Japan', 'Mexico', 'Netherlands', 
  'Norway', 'Portugal', 'Singapore', 'Spain', 'Sweden'
];

const badBox = document.getElementById("bad-box");
const goodBox = document.getElementById("good-box");

const badList = document.getElementById("bad-list");
const goodList = document.getElementById("good-list");
const badStats = document.getElementById("bad-stats");
const goodStats = document.getElementById("good-stats");


// We need to define the filter function like this coz we need to know which box we are listening to & which list we need to update
function makeFilter(listEl, statsEl) {
   let runs = 0;
   
   // note this inner fun gets returned only when outer is called
   // note: it MUST be a regular function (not an arrow) because it relies on 'this'.
   // fn.apply(this, args) can set 'this' for a regular function, but an arrow function ignores apply/call/bind for 'this'.
   return function filterCountries() {
      runs++;

      // console.log(this);
      // good -> 'this' is the input element, so this.value is what the user typed
      // bad  -> 'this' is window, window.value is undefined, so term is undefined.
      //         includes(undefined) searches for the text "undefined" -> no country matches -> empty list
      const term = this.value?.trim().toLowerCase();

      const filtered = countries.filter((item) => {
         return item.toLowerCase().includes(term);
      })
      
      listEl.innerHTML = filtered.map((item) => `<li>${item}</li>`).join("");
      statsEl.innerHTML = `filterCountries has run ${runs} times.`;
   }
}

// Debounce functions 

// BAD
function badDebounce(fn, delay) {
   let timer;

   // Ultimately this function will be called & at that point 'this' is bad-inputEl
   return function(...args) {
      clearTimeout(timer);

      // regular standalone function, which has 'this' as window
      timer = setTimeout(function() {
         fn.apply(this, args)
      }, delay);
   }
}
// GOOD
function goodDebounce(fn, delay) {
   let timer;
 
   // Ultimately this function will be called & at that point 'this' is good-inputEl
   return function(...args) { // captures whatever arguments the browser sends (like the event object)
      clearTimeout(timer);

      // arrow function, which has 'this' as 'parent this'
      timer = setTimeout(() => {
         fn.apply(this, args); // forwards those arguments down to 'fn'
      }, delay);
   }
}

// *note that in both good & bad, the setTimeout callback forms a closure with the outer lexical env
// (so fn, args, delay, timer are reachable in both cases).
// BUT closure & 'this' are two separate things:
// - closure deals with VARIABLES, found by looking up the scope chain.
// - 'this' is NOT looked up like a variable for a regular function. A regular function gets its own 'this',
//   decided by HOW it is called. setTimeout calls it as a plain function -> 'this' = window.
//   It doesn't "override the closure", the closure still works fine (that's why fn & args still work in the bad version,
//   only 'this' is wrong).
// - an arrow function has NO 'this' of its own, so 'this' gets looked up through the scope chain like a normal variable,
//   & finds the 'this' of the outer function (the input element).

// #2 when js loads,
/* 
- bad
JS evaluates the arguments first, so makeFilter runs BEFORE badDebounce:
1. makeFilter's EC1 created (runs = 0, listEl, statsEl), returns bad-filterCountries which forms closure with EC1's env,
   EC1 destroyed from stack but closure keeps the LE alive in heap
2. bad-filterCountries is passed to badDebounce, badDebounce's EC2 created (fn, delay, timer), returns the debounce inner function
   which has closure with EC2's env, EC2 destroyed from stack but closure keeps the LE alive in heap

- good
.... similar (but its own separate timer & its own separate runs, so the two boxes never interfere with each other)

now ultimately after the script finishes loading, debouncedBad holds badDebounce inner function & debouncedGood holds goodDebounce inner function
so actually these functions are called by eventListeners
*/
const debouncedBad = badDebounce(makeFilter(badList, badStats), 500); 
const debouncedGood = goodDebounce(makeFilter(goodList, goodStats), 500); 

// Initially show complete list
badList.innerHTML = goodList.innerHTML = countries.map((item) => `<li>${item}</li>`).join("");

// #1 whenever the event occurs, browser sets 'this' to the element the listener is attached to (event.currentTarget)
// (here it is the same as the element where the event occurred, but with bubbling they can differ)
// note: we pass the function itself (no parentheses), the browser calls it later
badBox.addEventListener("input", debouncedBad);
goodBox.addEventListener("input", debouncedGood);

// FLOW when user types "india" fast in the good box:
// - every keystroke -> browser calls debouncedGood with this = goodBox & args = [event]
// - each call: clearTimeout(timer) cancels the previous scheduled call, then schedules a new 500ms one
// - "i", "in", "ind", "indi" -> all cancelled before their 500ms ended, filterCountries never ran for them
// - after the last "a", user stops -> 500ms passes -> arrow function fires -> fn.apply(this, args) -> filterCountries runs ONCE with this = goodBox
// result: 5 keystrokes, 1 filter run (you can see it in the runs counter)

// In short: when you call the debounce's inner function via the event listener, 
// 'this' correctly refers to the input element.
// However, inside the setTimeout callback, what 'this' becomes depends 
// entirely on the type of callback you use:

// 1. Regular Function Callback (BAD):
//    A regular function inside setTimeout has its own 'this', which resets 
//    to the global 'window' object when executed, breaking our filter code.

// 2. Arrow Function Callback (GOOD):
//    An arrow function does not have its own 'this'. It lexically captures 
//    and keeps 'this' pointing safely to the input element from the outer scope.

// GOTCHA / things to remember:
// - debounce(...) runs ONCE at setup, the returned inner function runs on EVERY event
// - each debounce(...) call creates its own separate timer
// - don't wrap it like addEventListener("input", debounce(fn, 500)) inside another handler/loop -> that creates a new timer every time & debouncing silently stops working
// - debounce = run only AFTER the user stops (wait for quiet)
//   throttle (next topic) = run at most once every X ms while the events keep coming (e.g. scroll)

