// What's the limitations JS Objects & Arrays have?
/* 
JS Objects works for plain key-value pairs, but the keys can only be strings/symbols, even if you use some other type JS converts it to string
& also there is no built-in method to find the length or size of object (how many items it contains)
& also objects do not reme,remember the order in which the items were added to it.

JS Arrays can have duplicates & in order to store only unique items you need to manually write the logic
*/

// --- Map:
// Key can be of any type (objects, functions, numbers, booleans, or strings).
// It remembers the order in which items were added to it
/* Core Methods:
   .set(key, value) – Adds or updates a key-value pair.
   .get(key) – Retrieves the value by key.
   .has(key) – Checks if a key exists (returns true or false).
   .delete(key) – Removes a key-value pair.
   .size – Returns the total number of items.
   .clear() – Removes all items. */

// create map
const userRoles = new Map();

// set Object as keys
const alex = { 'name': 'Alex Richard', 'age': 32 };
const sam = { 'name': 'Sam Blake', 'age': 34 };
const hari = { 'name': 'Hari Om', 'age': 28 };

userRoles.set(alex, 'Admin');
userRoles.set(sam, 'User');
userRoles.set(hari, 'User');
userRoles.set(101, 'Employee ID');  // numbers as key works too

// read values
console.log(userRoles.get(alex));
console.log(userRoles.get(101));

// check existence 
console.log(userRoles.has(sam));
console.log(userRoles.has(102));

// delete item
userRoles.delete(101);
console.log(userRoles.has(101));

// get size
console.log(userRoles.size);

// interators: keys, values, entries 
userRoles.keys().forEach(key => console.log(key));
userRoles.values().forEach(value => console.log(value));
userRoles.forEach((value, key) => {
   console.log(key, '=>', value);
})
// or 
for (let [user, roles] of userRoles) {
   console.log(user.name, '->', roles);
}

// Conversions

// Object to Map
const users = {
   'samay': 20,
   'ronie': 22,
   'deep': 25
};
const usersMap = new Map(Object.entries(users));
console.log(usersMap);

// Map to Object
console.log(Object.fromEntries(userRoles));  // works properly only when, 
console.log(Object.fromEntries(usersMap));   // Map keys are strings/symbols

// Map tot Array 
const map1 = new Map();
map1.set('milk', 55);
map1.set('butter', 30);
// console.log(Array.from(map1));
console.log([...map1]);


// Set:
// A Set is a collection of unique values. It cannot contain duplicate items. 
// Values can be primitives (numbers, strings, booleans) or complex objects.
/* Core Methods:
   .add(value) – Adds a new value (returns the set, so you can chain calls).
   .has(value) – Checks if a value exists (returns true or false).
   .delete(value) – Removes a specific value.
   .size – Returns the total number of unique elements.
   .clear() – Removes all elements. */

// Creation
const tags = new Set(["js", "html", "css"]);

// Adding items (duplicates are automatically ignored)
tags.add("react");
tags.add("js"); // Duplicate ignored!

console.log(tags); // Set(4) { 'js', 'html', 'css', 'react' }

// Checking existence ($O(1)$ fast lookup)
console.log(tags.has("react")); // true
console.log(tags.has("python")); // false

// Getting size & deleting
console.log(tags.size); // 4
tags.delete("css");

// Iteration
tags.forEach((tag) => console.log(tag));

// Set & Object
const pset = new Set();

let person = { 'name': 'Alex' };
pset.add(person);

person.name = 'Bob'; // same ref. (object) just modified it
pset.add(person); // size still 1

person = {};   // complete new ref. (object)
pset.add(person); // size 2

console.log(pset);   
