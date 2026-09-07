// What is Event?
// JavaScript Event is a signal fired by the browser when something happens on the webpage.

// (Event) DOM Content Loaded 
document.addEventListener("DOMContentLoaded", () => console.log("DOM Content Loaded.."));

const countButton = document.getElementById("countBtn");
let counter = 0;
// An anonymous function cannot be removed if it was passed directly into addEventListener
// therefore use named handler function - 
function handleCount() {
   console.log(counter++);
}
function handleGreet() {
   console.log("hello");
   console.log(this);
}

// Add Event 
countButton.addEventListener("click", handleCount);
countButton.addEventListener("click", handleGreet);

// Remove Event 
countButton.removeEventListener("click", handleGreet);

// Event Object
const searchInput = document.getElementById("search-id");
function handleChange(event) {
   console.log("Event:", event);
   console.log("Event Type:", event.type);
   console.log("Event Target:", event.target);
   console.log("Event Target Name:", event.target.name);
   console.log("Event Target Value:", event.target.value);
}
searchInput.addEventListener("change", handleChange);

