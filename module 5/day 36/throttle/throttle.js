const area = document.getElementById("area");
const rawStats = document.getElementById("raw-stats");
const badStats = document.getElementById("bad-stats");
const goodStats = document.getElementById("good-stats");

// function we wanna throttle - countRuns, it simply counts how many times the event is fired
//    why we defined it like this?
//    coz we wanna track 3 diff runs(raw, good, bad):
//    so makeCounter creates 3 diff LE in closure with 3 diff countRuns
//    now on each countRuns call, updates & tracks theirs runs
function makeCounter(statsEl) {
   let runs = 0;
   return function countRuns() {
      runs++;
      statsEl.innerText = runs;
   }
}

// THROTTLE Function
function throttle(fn, delay) {
   let lastCall = 0;

   // Ultimately this function will be called & at that point 'this' is the area el
   return function(...args) {
      const now = Date.now();

      // if delay window has passed or ended, run the counterRuns
      if(now - lastCall >= delay) {
         lastCall = now;
         fn.apply(this, args);
      }
      // else, just skipp this call
   }
}

// 3 diff runs & countRuns
const rawCounter = makeCounter(rawStats); // raw-coutnerRuns which has closure - raw-runs (runs on each event fire)
const badCounter = makeCounter(badStats); // bad-coutnerRuns which has closure - bad-runs (runs on each event fire, below)
const goodCounter = throttle(makeCounter(goodStats), 500); // throttle's inner function which has closure - [lastCall, good-counterRuns which has closure - good-runs]

area.addEventListener("pointermove", rawCounter);
area.addEventListener("pointermove", function(e) {
   throttle(badCounter, 500)(e); // why bad? 
   // coz it create a brand new throttle LE on each event fire, 
   // so brand new lastCall = 0 for each fire
   // so bad-counterRuns is being called on each event fire, 
   // which is same as raw.
});
area.addEventListener("pointermove", goodCounter);

