// 1. Traverse and Toggle Classes
// Build a navigation menu. On click of a list item:
// Traverse up to parent <ul>
// Remove .active class from all <li>
// Add .active only to the clicked <li>

const itemsList = document.querySelectorAll("ul li");
itemsList.forEach(item => {
   item.addEventListener("click", () => {
      const parent = item.parentElement;
      const children = parent.querySelectorAll("li");
      children.forEach(li => li.classList.remove("active"));
      item.classList.add("active");
   });
});

// 2. Highlight Text Using Range
// Use the Range API to highlight a portion of a paragraph by wrapping it with a <mark> tag.

const para = document.getElementById("para");
const range = document.createRange();
range.setStart(para.firstChild, 12);   // 1. select the custom range, from here
range.setEnd(para.firstChild, 23);     // till here
const extracted = range.extractContents();   // 2. extract that portion as fragment
const mark = document.createElement("mark"); // 3. create mark element
mark.append(extracted); // 4. append fragment to mark element
range.insertNode(mark); // 5. insert mark node at start of the range

// 3. Use DocumentFragment for Performance
// Insert 20 list items into the DOM using:
// Plain DOM methods (one by one)
// DocumentFragment (all at once)

const mylist = document.getElementById("mylist");
for(let i = 1; i <= 20; i++) {
   const li = document.createElement("li");
   li.innerText = `Item ${i}`;
   mylist.append(li);   // DOM repaints 20 times
}

const fragment = document.createDocumentFragment();
const li = document.createElement("li");
for(let i = 1; i <= 20; i++) {
   const clone = li.cloneNode(true);
   clone.innerText = i;
   fragment.append(clone);
}
mylist.append(fragment);   // just 1 time

// 4. Build a “Smart Cloner”
// Create a UI with an element and a “Clone” button. Use cloneNode(true) and cloneNode(false) and show the difference visually.

const targetCard = document.getElementById("targetCard");
const deepResult = document.getElementById("deepResult");
const shallowResult = document.getElementById("shallowResult");

// cloneNode(true) (Deep): Copies the element, its attributes (classes, IDs, styles), and all nested child nodes (headers, text, badges).
document.getElementById("btnDeep").addEventListener("click", () => {
   const deepClone = targetCard.cloneNode(true);
   deepResult.append(deepClone);
});

// cloneNode(false) (Shallow): Copies only the outer element and its attributes. All inner text and child elements are ignored.
document.getElementById("btnShallow").addEventListener("click", () => {
   const shallowClone = targetCard.cloneNode(false);
   shallowResult.append(shallowClone);
});

// 5. MutationObserver Watcher
// Create a div and use MutationObserver to log whenever:
// A new child is added
// The class attribute changes
// Text is modified

const watchthis = document.getElementById("watchthis");
const observer = new MutationObserver((mutationList, observer) => {
   for(const mutation of mutationList) {
      if (mutation.type === "childList") {
         mutation.addedNodes.forEach(node => {
            console.log("New child added:", node);
         });
      } else if (mutation.type === "attributes") {
         console.log(`attribute changed: ${mutation.attributeName}`);
      } else if (mutation.type === "characterData") {
         console.log("Text content modified:", mutation.target.textContent);
      }
   }
});
const config = {
   subtree: true,
   attributes: true,
   childList: true,
   characterData: true
};
observer.observe(watchthis, config);

document.getElementById("changeDOM").addEventListener("click", () => {
   if (watchthis.firstChild && watchthis.firstChild.nodeType === Node.TEXT_NODE) {
      watchthis.firstChild.data = "text node changed";
   } // characterData
   
   const newDiv = document.createElement("div");
   newDiv.innerText = "I am new child node";
   watchthis.append(newDiv);   // childList
   
   watchthis.setAttribute("data-status", "changed"); // attributes
});
