// Event Bubbling -
// when an event occurs, it starts from the target & goes all the way up to it's ancestors like a bubble
// target->parent->grand parent->....document->window
// By default Bubbling is enable

document.getElementById("child").addEventListener("click", () => {
   console.log("Event on child element");
}); // bubbling phase
document.getElementById("parent").addEventListener("click", () => {
   console.log("Event on parent element");
}); // bubbling phase
document.getElementById("grandParent").addEventListener("click", () => {
   console.log("Event on grand parent element");
}); // bubbling phase

// Event Capturing -
// when an event occurs, it starts from top most ancestor & comes all the way down to the target
// window->document->....parent->target
// By default Capturing is disable
// explicitly enable capturing by passing "true" as the third argument.

// Complete Flow : occurs when capturing is enabled
// 1. Capturing Phase - top to bottom
// 2. Target Phase - occured on target
// 3. Bubbling Phase - target to top

document.getElementById("child").addEventListener("click", () => {
   console.log("Event on child element");
}, true); // capturing phase
document.getElementById("parent").addEventListener("click", () => {
   console.log("Event on parent element");
}, true); // capturing phase
document.getElementById("grandParent").addEventListener("click", () => {
   console.log("Event on grand parent element");
}, true); // capturing phase

// Event Delegation - 
// an technique where you add a single eventListner to a parent
// so you can hear events of all it's children, possible by the concept of event bubbling 

document.getElementById("itemList").addEventListener("click", (event) => {
   console.log(`Event occured on ${event.target.innerText}`);
});

// Stop Event Propagation
// sometime it is needed to stop the event from bubbling up/capturing down, 
// just call the stopPropagation on, from where you want it to stop

document.getElementById("father").addEventListener("click", (e) => {
   console.log(`clicked father`);
});
document.getElementById("son").addEventListener("click", (e) => {
   e.stopPropagation(); // stop here itself, on son
   console.log(`clicked son`);
});
