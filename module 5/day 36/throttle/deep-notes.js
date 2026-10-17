// 2. THROTTLING -
/* It simply makes sure a function runs at most once in a specific amt of time, no matter how many times the event fires
& if the event fires again before that time is elapsed, that call is just skipped (not delayed, not saved, just ignored)

* Imagine it as: "In debounce, all the previous event calls are ignored within the delay and only the last one is considered. 
In throttling, all the next calls are ignored and only the first one within the delay is considered 
(like clicking 50 times in 1 second: 
without throttling it runs 50 times immediately and then 50 more after 1 second, but 
with throttling only the 1st call executes and the next 49 are ignored, and then after 1 second the next new first call is considered again)."

why we need it?
events like scroll, mousemove, resize fire like 50-100 times in 1 sec. we dont want heavy work
(calculate position, update UI, API call) on every single one of them
but unlike a search box, here we DO want updates while the user is still moving (eg scroll progress bar, drag)
so waiting for the user to stop (debounce) is not what we want
so simply - run it at a steady pace while events keep coming, not on every event
use cases - scroll, mousemove, resize, dragging, button spam (like a game shoot button)

debounce vs throttle (easy to mix up) -
debounce -> waits for quiet. timer keeps resetting, runs only ONCE after user stops
throttle -> doesn't wait for quiet. runs at a fixed pace (once per delay) WHILE events keep coming
eg user scrolls non-stop for 3 sec, delay = 1 sec
   debounce -> runs 1 time (after the user stops)
   throttle -> runs ~3 times (once every sec while scrolling)

to understand throttle just remember these 3 things -
1. closure -> 'lastCall' lives in the outer fun & every call of the returned inner fun shares that same lastCall
              (same idea as 'timer' in debounce)
2. time check -> Date.now() - lastCall >= delay ? run : skip. no setTimeout, no clearTimeout here, we just compare time
3. this & args -> fn.apply(this, args) forwards them
   note: here fn runs RIGHT AWAY inside the inner fun (not later inside setTimeout), so 'this' is already correct.
   no arrow fun trick needed like in debounce */

// *note: same as before, think in 2 parts - 1. the setup when script loads 2. follow the setup when event occurs
const area = document.getElementById("area");
const rawStats = document.getElementById("raw-stats");
const badStats = document.getElementById("bad-stats");
const goodStats = document.getElementById("good-stats");


// the function we want to throttle, it just counts how many times it actually ran & shows it
// we define it like this coz we need to know which stats element to update (same reason as makeFilter)
function makeCounter(statsEl) {
   let runs = 0;

   // note this inner fun gets returned only when outer is called
   return function countRuns() {
      runs++;
      // console.log(this); // good -> 'this' is the area el, bad -> 'this' is window (we call it w/o any element)
      statsEl.textContent = runs;
   };
}

// THROTTLE FUNCTION
function throttle(fn, delay) {
   // starts at 0 so the very first event always runs (Date.now() is a huge number, so the gap is huge)
   let lastCall = 0;

   // Ultimately this function will be called & at that point 'this' is the area el
   return function (...args) { // captures whatever args browser sends (like the event object)
      const now = Date.now();

      // enough time passed since the last time we actually ran fn?
      if (now - lastCall >= delay) {
         lastCall = now;        // remember WHEN we ran, so next calls can be compared with this
         fn.apply(this, args);  // run now, forwarding 'this' & args
      }
      // else -> do nothing. this event is skipped
   };
}


// #2 when js loads (setup, runs only once),
/*
- good
js evaluates the arguments first, so makeCounter runs BEFORE throttle:
1. makeCounter's EC1 created (runs = 0, statsEl), returns countRuns which forms closure with EC1's env,
   EC1 destroyed from stack but closure keeps the LE alive in heap
2. countRuns is passed to throttle, throttle's EC2 created (fn, delay, lastCall = 0), returns the throttle inner function
   which has closure with EC2's env, EC2 destroyed from stack but closure keeps the LE alive in heap

now ultimately goodThrottled holds the throttle inner function, so the eventListener calls it on every event
*/
const goodThrottled = throttle(makeCounter(goodStats), 500);

// for comparison
const rawCounter = makeCounter(rawStats); // no throttle at all
const badCounter = makeCounter(badStats); // this one gets wrapped in the WRONG way below


// #1 whenever the event occurs, browser sets 'this' to the element on which the listener is attached
// (pointermove = mousemove + touch, works on phones too)
// note: we pass the function itself w/o () coz browser will call it later

// RAW - runs on every single event
area.addEventListener("pointermove", rawCounter);

// BAD - throttle() is called INSIDE the handler
// so on every event a brand new throttle() runs -> new EC, new lastCall = 0 -> gap is always huge -> always runs
// the old lastCall is lost coz nobody is holding that old closure anymore. so nothing is ever throttled
area.addEventListener("pointermove", function (e) {
   throttle(badCounter, 500)(e);
   // above is shorthand for -
   // const retFun = throttle(badCounter, 500); 
   // retFun(e);
});

// GOOD - throttle() is called ONCE at setup, the listener only gets the returned inner fun
// so every event shares the same lastCall
area.addEventListener("pointermove", goodThrottled);


// FLOW of good throttle, delay = 500ms, events come at t0, t0+100, t0+300, t0+600, t0+1000 (ms) -
// t0       -> lastCall is 0, gap is huge >= 500 -> RUN,  lastCall = t0
// t0+100   -> gap = 100 < 500                   -> skip
// t0+300   -> gap = 300 < 500                   -> skip
// t0+600   -> gap = 600 >= 500                  -> RUN,  lastCall = t0+600
// t0+1000  -> gap = 400 < 500                   -> skip
// result: 5 events, 2 runs

// In short: throttle = a gate that opens once every 'delay' ms. events that arrive while the gate is closed are skipped
// the only memory it needs is 'lastCall' & it must be shared between calls (closure) so create the throttled fun ONCE

// things to remember -
// - throttle(...) runs only once at setup, the returned inner fun runs on every event
// - never call throttle(...) inside the handler (see BAD above), nothing gets throttled
// - this version runs on the FIRST event & skips the rest of the window, so the LAST event can get skipped
//   (eg the final mouse position may never be processed). fix = also schedule a trailing call using setTimeout (advanced, later)
// - skipped events are lost, not queued. if you need the last value too, throttle alone is not enough
// - throttle = steady pace while events keep coming, debounce = only once after they stop
