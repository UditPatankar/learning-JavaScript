const input = document.getElementById("num-input");
const calcBtn = document.getElementById("calc-btn");

// Memoization function
function memoize(fn) {
   const cache = new Map();

   // Utimately this function will be called on event, as fn(n)
   return function(...args) {
      const key = JSON.stringify(args);

      // return saved o/p
      if (cache.has(key)) {
         return cache.get(key);
      }
         
      // calculate the o/p & save it for this i/p
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
   }
}


// Track how many time each fibo is called 
const calls = { plain: 0, memo: 0 };

// Plain Fibo
function plainFib(n) {
   calls.plain++;
   if(n <= 2) return 1;
   return plainFib(n - 1) + plainFib(n - 2);
};

// Memo Fibo
const memoFib = memoize(
   function(n) { 
      calls.memo++;
      if (n <= 2) return 1;
      return memoFib(n-1) + memoFib(n-2);
   }
);

// * important: A = actual fn fibo function, B = the inner function
// the reason we call B recursively, coz
// coz we need to check the cache for each recursive call (measn each time n gets smaller)
// if B don't find it in cache it calls A-fn which calls B did not found in cahche calls A-fn again.....& if A-fn find the result B saves it, chain gos back.....
// B => A => B => A => so on


// Function to actually run & evaluate run time of a given fucntion
function run(fn, n, type) {   // type: plain/memo
   calls[type] = 0; // reset for this click

   const start = performance.now();
   const result = fn(n) // it is actually memo/plain-fibo(n)
   const time = performance.now() - start;

   document.getElementById(type + "-result").innerText = result;
   document.getElementById(type + "-time").innerText = time.toFixed(1) + "ms";
   document.getElementById(type + "-calls").innerText = calls[type];
}

calcBtn.addEventListener("click", () => {
   let n = Number(input.value);

   // if n is not b/w 0 & 40
   n = Math.max(0, Math.min(40, Math.floor(n))) // keep it b/w 0 & 40, if it is not
   input.value = n; // also update the input box with n b/w 0 & 40

   run(plainFib, n, "plain");
   run(memoFib, n, "memo");
});