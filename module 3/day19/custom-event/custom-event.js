const button = document.querySelector("button");

// 1. Create custom event -

const myEvent = new CustomEvent("testEvent", {
   // configure here - how the event behaves and passes custom data to your listener
   detail: { eventname: "test" },   // custom data
   bubbles: true, // allow bubbling
   cancelable: true  // allow preventDefault()
});

// 2. Listen for custom event -

document.addEventListener("testEvent", () => {
   console.log("test event occured on document");
});
button.addEventListener("testEvent", () => {
   console.log("test event occured on button");
});

// 3. Dispatch (fire) custom event -
button.dispatchEvent(myEvent);

// -----------------------------------

// Example - when user clicks button, custom event should fire that welcomes user

document.addEventListener("userlogin", (e) => {
   const heading = document.querySelector("h2");
   heading.innerText = `Welcome ${e.detail.username}`;
   console.log(`${e.detail.role} logged in.`);
});

function loginUser(username, role) {
   // creates custom event
   const userLoginEvent = new CustomEvent("userlogin", {
      detail: { username, role },
      bubbles: true
   });
   // dispatches (fires) it on button
   button.dispatchEvent(userLoginEvent);
}

button.addEventListener("click", () => loginUser("Udit", "Admin")); 
