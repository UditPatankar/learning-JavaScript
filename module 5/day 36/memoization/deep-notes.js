// 3. MEMOIZATION -
// It simply remembers the result of a function for the inputs it was already called with
// & if the function is called again with the SAME inputs, it returns the saved result instead of calculating it again

// why we need it?
// some functions are expensive & get called again & again with the same inputs
// calculating the same answer every time = wasting computation
// so simply - calculate once, save it, next time just look it up
// real life example - you did 47 x 83 on paper once. next time someone asks the same, you read your old note instead of calculating again
// use cases - heavy calculations, recursive functions (like fibonacci), filtering/sorting big data, anything pure & expensive

// debounce / throttle vs memoization (easy to mix up) -
// debounce & throttle -> control WHEN a function runs (how often it gets called)
// memoization -> doesn't care how often it is called, it avoids doing the SAME WORK again for the same input

// WHY FIBONACCI is the classic example?
// fib(n) = fib(n-1) + fib(n-2), fib(0) = 0, fib(1) = 1   ->   0, 1, 1, 2, 3, 5, 8, 13 ...
// the function calls ITSELF twice & those 2 calls repeat the same work again & again. look at the calls for fib(5) -
//
//                          fib(5)
//                  /                 \
//             fib(4)                 fib(3)          <- fib(3) calculated here
//            /      \                /     \
//        fib(3)     fib(2)       fib(2)   fib(1)     <- & again here (2nd time)
//        /    \     /   \        /   \
//    fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)
//    /   \
// fib(1) fib(0)
//
// fib(3) is calculated 2 times, fib(2) 3 times, fib(1) 5 times ... total 15 calls just for fib(5)
// it grows super fast (roughly doubles with every +1 in n). fib(35) = ~30 million calls, fib(40) = ~330 million
// but there are only 6 DIFFERENT inputs (5,4,3,2,1,0). so if we remember each answer, we need only 6 calculations

// to understand memoize just remember these 3 things -
// 1. closure -> 'cache' lives in the outer fun & every call of the returned inner fun shares that same cache
//               (same idea as 'timer' in debounce & 'lastCall' in throttle)
// 2. key -> to find an old result we need an id for the inputs. we turn args into a string key using JSON.stringify(args)
// 3. check first, calculate only if missing -> cache has the key ? return saved : calculate, save, return
//    (fn.apply(this, args) is used to forward 'this' & args, same as before)

// IMPORTANT - memoization only works correctly for PURE functions
// pure = same input always gives same output & no side effects (doesn't change anything outside, no API call, no DOM update)
// fib is pure (fib(10) is always 55) -> safe to memoize
// eg Math.random(), Date.now(), fetch() -> NOT pure, the saved result would be stale/wrong

// *note: same as before, think in 2 parts - 1. the setup when script loads 2. follow the setup when function gets called
const input = document.getElementById("num-input");
const calcBtn = document.getElementById("calc-btn");

// how many times each fib BODY really ran (cache hits do NOT count, they never reach the body)
// we reset these on every click so we can compare
const calls = { plain: 0, memo: 0 };


// MEMOIZE FUNCTION
function memoize(fn) {
   // created ONCE when memoize runs & every call of the inner fun shares it
   // Map = like an object but keys can be anything & it has has/get/set
   const cache = new Map();

   // Ultimately this function will be called when we want the answer
   return function (...args) { // captures all the args we pass (here: [n])
      const key = JSON.stringify(args); // eg args [5] -> key "[5]"

      // we use cache.has(key), NOT "if (cache.get(key))"
      // coz saved result can be falsy (0, false, "") & a truthy check would think it's missing & calculate again
      // eg fib(0) = 0 -> falsy!
      if (cache.has(key)) {
         return cache.get(key); // found -> no calculation
      }

      const result = fn.apply(this, args); // not found -> calculate (the slow part)
      cache.set(key, result);              // save for next time
      return result;
   };
}


// plain fib, every call does the full work again
function plainFib(n) {
   calls.plain++;
   if (n < 2) return n;
   return plainFib(n - 1) + plainFib(n - 2);
}


// memoized fib
// there are 2 different functions here, think of them as A & B -
// A = the function we write inside memoize(...). it has the fib logic (the real work) but NO cache check
// B = what memoize(...) returns (the inner function with the cache check). memoFib holds B, NOT A
const memoFib = memoize(function (n) { // <- this is A
   calls.memo++;
   if (n < 2) return n;
   return memoFib(n - 1) + memoFib(n - 2); // <- 'memoFib' is B, so this goes back to B (cache check), NOT directly to A
});

// *note for recursion (important) -
// the calls go like B -> A -> B -> A -> B ..., so EVERY recursive call passes through B (the cache check)
//
// setup (runs once, when script loads) -
// 1. js creates A (only creates it, doesn't run it)
// 2. memoize(A) runs, makes an empty cache & returns B
// 3. memoFib = B. nothing is calculated yet
//
// when memoFib(3) is called -
// memoFib(3)         -> B: "[3]" MISS -> calls A(3)
//   memoFib(2)       -> (A uses the name memoFib which holds B) B: "[2]" MISS -> calls A(2)
//     memoFib(1)     -> B: "[1]" MISS -> A(1) returns 1, B saves it
//     memoFib(0)     -> B: "[0]" MISS -> A(0) returns 0, B saves it
//   A(2) = 1, B saves "[2]"
//   memoFib(1)       -> B: "[1]" HIT -> returns 1 right away, A does NOT run
// A(3) = 2, B saves "[3]"
//
// what if A called itself directly (A -> A -> A)? it would skip B, so the cache is never checked in the middle of the recursion
// only the first outer call would be saved & the inside work would be plain recursion again (no real speed up)
// (here A has no name so it can't call itself directly, the only name it can use is 'memoFib' which is B)
//
// how can A use 'memoFib' before it exists?
// A's body doesn't run when A is defined, it runs only when someone calls it
// js looks up the variable memoFib at the moment that line RUNS, & by then memoFib = B is already set
// (the first call comes from the click, after the setup. if it was called before the assignment finished, it would throw an error)


// #2 when js loads (setup, runs only once),
/*
memoFib = memoize(function ...) ->
memoize's EC1 created (fn = that anonymous function, cache = empty Map), returns the memoize inner function
which forms closure with EC1's env, EC1 destroyed from stack but closure keeps the LE alive in heap
-> that LE holds the cache, so cache stays alive as long as memoFib exists
now ultimately memoFib holds the memoize inner function. the anonymous fn inside also uses the name memoFib,
so its recursive calls come back to this same inner function & share the same cache
*/


// helper just to call a version, measure time & show it
function run(key, fn, n) {
   calls[key] = 0; // reset the counter for this click

   const start = performance.now();
   const result = fn(n);
   const time = performance.now() - start;

   document.getElementById(key + "-result").textContent = result;
   document.getElementById(key + "-time").textContent = time.toFixed(1) + " ms";
   document.getElementById(key + "-calls").textContent = calls[key];
}

// #1 whenever the click occurs, we call both versions with the same n
calcBtn.addEventListener("click", () => {
   let n = Number(input.value);
   n = Math.max(0, Math.min(40, Math.floor(n))); // keep it between 0 & 40
   input.value = n;

   run("plain", plainFib, n);
   run("memo", memoFib, n);
});


// FLOW of memoFib(5) on a fresh cache (it goes down the left side first) -
// memoFib(5) -> key "[5]" MISS -> body runs -> calls memoFib(4)
//   memoFib(4) -> MISS -> body runs -> calls memoFib(3)
//     memoFib(3) -> MISS -> body runs -> calls memoFib(2)
//       memoFib(2) -> MISS -> body runs -> calls memoFib(1) -> MISS -> body runs -> returns 1 (saved)
//                                       -> then memoFib(0) -> MISS -> body runs -> returns 0 (saved)
//       memoFib(2) = 1 (saved)
//     memoFib(3) now needs memoFib(1) -> HIT (saved just now) -> memoFib(3) = 2 (saved)
//   memoFib(4) now needs memoFib(2) -> HIT -> memoFib(4) = 3 (saved)
// memoFib(5) now needs memoFib(3) -> HIT -> memoFib(5) = 5 (saved)
// result: body ran only 6 times (for 5,4,3,2,1,0) instead of 15, the rest were 3 cache HITs
// for big n the difference is huge -> fib(35) = 36 body runs instead of ~30 million

// what happens on later clicks -
// same n again  -> plain: full work again. memo: HIT on "[n]" (instant, body runs 0 times)
// n + 1         -> plain: full work again. memo: body runs just 1 time (fib(n) & fib(n-1) are already saved, only the new top one is calculated)

// In short: memoize = a function wrapped with a notebook (the cache). before doing the work it checks the notebook
// the notebook must be shared between calls (closure) so create the memoized fun ONCE
// & for recursion, the recursive calls must also go through the notebook

// things to remember -
// - memoize(...) runs only once at setup, the returned inner fun runs on every call
// - the cache must live OUTSIDE the returned fun (in the outer fun), else every call gets a new empty cache & it never hits
// - only for PURE functions (same input -> same output, no side effects)
// - cache only grows, nothing removes old entries -> too many different inputs = memory keeps increasing
//   (fix = limit the size, like removing the oldest/least used entry, advanced, later)
// - JSON.stringify as key is simple but has limits: functions & undefined get lost, 2 different objects with same content
//   give the same key, & it costs time for big objects. fine for numbers/strings
// - use has() not a truthy check, coz 0 / false / "" are valid results (fib(0) = 0)
// - not worth it for cheap functions, the key creation + lookup can cost more than just calculating
// - fib numbers get too big for normal numbers after ~78 (precision is lost), that's why input is limited to 40 here