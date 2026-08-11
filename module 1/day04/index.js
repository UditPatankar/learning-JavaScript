console.log("Day 4: Conditional Statements (if-else, switch-case, ternary operator)");

// this statements are used to controll the flow of execution of your code, it basically branches the flow using. 

//--- if-else ---

let age = 21;
if(age >= 18) { // this condition decides from which line the execution continues next, 8,9 or 10,11,12
   console.log("Yes, you are an adult!");
}
else {
   console.log("No, you are not an adult yet!");
}

// nested if-else -
let condition = true;
let innerCondition = false;

if(condition) {
   console.log("Outer if");
   
   if(innerCondition)
      console.log("Inner if");
   else
      console.log("Inner else");

}
else {
   console.log("Outer else");
}

// --- switch-case --- 

let switchCondition = 7;
switch (switchCondition) { // the codition can return any value after evaluation & then switch looks for that value, if you don't put break inside the case every next case is executed from there
   case 1: console.log("case 1");
   case 2: console.log("case 2");
   case 3: console.log("case 3");
   break;
   case 4: console.log("case 4");
   case 5: console.log("case 5");

   default: console.log("Nothing is matched");
}
// *** if-else VS switch-case:
   // 1. if-else chains are always evaluated sequentially on the spot (Linear time: O(n)).
   // 2. switch-case *can* be optimized by the JS engine's JIT compiler into a 'JUMP TABLE' or hash map (Constant time: O(1)).
   // 3. However, this optimization only happens if the switch uses predictable, dense values (like integers or strings). 
   // 4. If the cases use complex expressions or mixed types, the engine falls back to sequential execution just like if-else.
   
   // SO IT IS BETTER TO USE if-else WHEN YOU ARE DEALING WITH COMPLEX CONDITIONS/EXPRESSIONS
   // BUT IS GOOD TO USE switch-case WHEN THE VALUES ARE SIMPLE/DIRECT

