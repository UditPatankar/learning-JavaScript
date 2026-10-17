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

// Function we wanna debounce - filterCountries: it filters the country based on the current value of input el
//    why define like this>
//    coz we wanna use 2 diff runs(bad, good), filterCountries(bad, good) 
//    so makeFilter creates 2 diff LE in clsure with 2 diff filterCountries
//    on each filterCountries call, updates & tracks their runs
function makeFilter(listEl, statsEl) {
   let runs = 0;
   
   // the debounce will 
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

const debouncedBad = badDebounce(makeFilter(badList, badStats), 500); // debounceBad's inner function which has closure - [bad-timer, bad-filterCountrie which has closure - [bad-runs]]
const debouncedGood = goodDebounce(makeFilter(goodList, goodStats), 500); // debounceGood's inner function which has closure - [good-timer, good-filterCountrie which has closure - [good-runs]]

// Initially show complete list
badList.innerHTML = goodList.innerHTML = countries.map((item) => `<li>${item}</li>`).join("");

// #1 whenever the event occurs, browser sets 'this' to the element the listener is attached to (event.currentTarget)
// (here it is the same as the element where the event occurred, but with bubbling they can differ)
badBox.addEventListener("input", debouncedBad);
goodBox.addEventListener("input", debouncedGood);
