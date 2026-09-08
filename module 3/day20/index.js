// Efficient DOM Traversal
/* const card = document.getElementById("parent");
const firstChild = card.firstElementChild;
const sibling = firstChild.nextElementSibling;
const lastChild = card.lastElementChild;
const parent = firstChild.parentElement; */

/* Document Fragment - 
- Container: an lightweight DOM node object that act as an invisible container for HTML elements
- it's an good way to keep the elements in isolation from DOM tree
- act as an parent node but it purely exist in memory not active DOM tree
- No Repaint: adding element to fragment does not repaint the DOM tree, until fragment is inserted to DOM
- good way to build some 'chunk of DOM' before adding them to DOM
- Auto-empty: when you append fragment to DOM tree only it's children gets inserted to DOM & leaving fragment container empty

Performance: Browser does not need to repaint & recalculate layout everytime you add a node.
Memory Efficient: Operates entirely in memory until attached. */

// Template & Cloning: 
// whole html from inside the template tag is 'by default'  placed in a 'fragment', means that html is not a part of DOM yet
// so you can do some operations on that html & then insert it to DOM later...

// since template contains the card[title, desc], now to create 4 such cards
// if I go normal way and use loop to create & append DOM will repaint 4 times (4 appends)
// to solve this create a single fragment that you can append on final
// one repaint per fragment append

const sampleData = [
   { title: "title 1", desc: "description 1" },
   { title: "title 2", desc: "description 2" },
   { title: "title 3", desc: "description 3" },
   { title: "title 4", desc: "description 4" },
];

// 1. get the template - it contains a fragment (inner fragment)
const template = document.getElementById("card-template");

// 2. create a single primary fragment to append once
const primaryFragment = document.createDocumentFragment();

// 3. clone inner fragment & append it to primary fragment
sampleData.forEach((data) => {
   const innerFragmentClone = template.content.cloneNode(true);   // inner fragment clone
   const card = innerFragmentClone.querySelector(".card");  // cloned card
   card.querySelector(".title").innerText = data.title;  // cloned title
   card.querySelector(".desc").innerText = data.desc; // cloned desc

   primaryFragment.append(innerFragmentClone);  // since you appended the innerFragment it will be empty now
});

// 4. append the primary fragment to DOM
document.body.append(primaryFragment); // since you appended the primaryFragment it will also be empty now

// Range - 
// Range object represents a fragment of a document that can contain nodes and parts of text nodes. 
// Unlike a DocumentFragment, a Range points to a specific slice of the existing DOM tree, 
// defined by a start point and an end point.
// Precise Control: Allows you to target specific text or elements without needing to select entire parent containers.

// <p id="para">Hello, <strong>world </strong>and universe!</p>
const para = document.getElementById("para"); // get the element
const range = document.createRange();  // create range object

range.selectNode(para); // encloses the target element AND its contents (the <p> tag is included).
range.selectNodeContents(para); // encloses ONLY the stuff inside <p> (the <p> tag itself is excluded).

// const extracted = range.extractContents(); //  Removes the contents of the range from the live DOM and moves them into a DocumentFragment (triggers 1 repaint).
const clone = range.cloneContents(); // Copies the contents of the range into a DocumentFragment without modifying the live DOM.

// custom range - setStart/End(element to begin/end on, specific index)
range.setStart(para.childNodes[0], 0);
range.setEnd(para.childNodes[2], 7); 

console.log(range.toString());

const newEl = document.createElement("span");
newEl.style.color = "yellowgreen";
newEl.innerText = "Hey ";
range.insertNode(newEl);   // insert new node at start of the range

// Mutation Observer - 
// A MutationObserver is a built-in Web API that lets you watch for changes made to the DOM tree 
// (like adding/removing nodes, changing attributes, or modifying text). 
// It executes a callback function whenever a change occurs.

// 1. Select the target HTML element you want to monitor
const target = document.getElementById("watchme");

// 2. Create the observer instance with a callback function
// The callback runs whenever DOM changes (mutations) occur inside the target
const observer = new MutationObserver((mutationList, observer) => {
   for (const mutation of mutationList) {
      console.log("Mutation type:", mutation.type);

      if (mutation.type === "childList") {
         console.log("Child node was added or removed.");
      }
      if (mutation.type === "attributes") {
         console.log(`Attribute "${mutation.attributeName}" was modified.`);
      }
      if (mutation.type === "characterData") {
         console.log(`Text changed to: "${mutation.target.data}".`);
      }
   }
});

// 3. Define the configuration object (what specific changes to watch for)
const config = {
   childList: true,     
   attributes: true,    
   characterData: true, 
   subtree: true        // Watch target AND all nested children inside it
};

// 4. Start monitoring the target element
observer.observe(target, config);

function changeDOM() {
   target.innerText = "you see I am changed"; // Triggers childList or characterData
   target.setAttribute("data-status", "changed"); // Triggers attributes
}