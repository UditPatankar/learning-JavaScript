// DOM Manipulation -

// Creating element 
const newElem = document.createElement("p");
newElem.innerText = "I am created dynamically.";
document.body.appendChild(newElem);

// Inserting element - parent.insertBefore(node-to-insert, reference-child-node);
const befElem = document.createElement("span");
befElem.innerText = "I am inserted before.";
document.body.insertBefore(befElem, newElem);

// Inserting element - there is no insertAfter, but we can simulate it
const aftElem = document.createElement("span");
aftElem.innerText = "I am inserted after.";
document.body.insertBefore(aftElem, newElem.nextElementSibling);  // if 2nd arg is null, aftElem will be added to the end of the list of parent's child

// Modifying Content 
{
   // innerHTML - but has security risks
   newElem.innerHTML = "I am created <u>dynamically</u>"; 
   
   // innerText vs textContent
   const demoElem = document.getElementById("demo");
   console.log("innerText:", demoElem.innerText);  // it considers the CSS visibilty
   console.log("textContent:", demoElem.textContent); // it does not
}

// Remove element 
{
   // remove()
   document.getElementById("demo").remove();
   
   // remove child -
   const myListElem = document.getElementById("myList");
   const itemToRemove = myListElem.removeChild(myListElem.children[0]); // returns the removed child
   console.log(itemToRemove);

   // replace a child - parent.replaceChild(newNode, oldNode)
   const oldNode = myListElem.children[0];
   const newNode = document.createElement("span");
   newNode.innerText = "I am the replacement.";
   myListElem.replaceChild(newNode, oldNode);

   // replace/remove childrens - parent.replaceChildren(node1, node2,..)
   // - you can pass text, element & it will replace the childs
   // - if you don't pass anything is deletes all the child
   // myListElem.replaceChildren();
}

// Read, Write, and Remove Attribute
{
   // get,
   const imgELem = document.querySelector('img');
   console.log(imgELem.getAttribute("src")); 
   console.log(imgELem.getAttribute("alt")); 
   
   // set,
   imgELem.setAttribute("src", "real.png");  // existing
   imgELem.setAttribute("width", "200");
   imgELem.setAttribute("height", "200");
   console.log(imgELem.getAttribute("src")); 
   console.log(imgELem.getAttribute("width")); 
   console.log(imgELem.getAttribute("height")); 
   
   // remove, 
   imgELem.removeAttribute("height");
   console.log(imgELem.getAttribute("height")); 

   // has
   console.log(imgELem.hasAttribute("width")); 
   console.log(imgELem.hasAttribute("height"));
}

// Traversing/Navigating DOM
{
   // parentElement & parentNode
   const spanElem = document.getElementById("text");
   console.log("parent Element:", spanElem.parentElement.parentElement);
   console.log("parent Node:", spanElem.parentNode.parentNode);

   // children & childNode
   const mainElem = document.getElementById("main-id");
   console.log("children", mainElem.children);  // only child elements(html)
   console.log("child Node", mainElem.childNodes); // all the child nodes(html, text, comment etc)

   console.log("first child node", mainElem.firstChild); // first node - enter(\n)
   console.log("first child element", mainElem.firstElementChild);   // first element

   // nextSilbling(node) & nextElementSibling(element)
   const list = mainElem.lastElementChild;
   const itemTwo = list.children[1];

   console.log("next sibling node:", itemTwo.nextSibling);
   console.log("next sibling element:", itemTwo.nextElementSibling);

   // previousSibling(node) & previousElementSibling(element)
   console.log("previous sibling node:", itemTwo.previousSibling);
   console.log("previous sibling element:", itemTwo.previousElementSibling);

   // firstChild(node) & firstElementChild(element)
}

// Manipulating Classes
{
   const mainELem = document.getElementById("main-id");
   
   // console.log("class name:", mainELem.className); // main-class layout
   // mainELem.className = "secondary-class"; // it will wipe all the other class
   // console.log("class name:", mainELem.className); // secondary-class

   console.log("class list:", mainELem.classList);
   mainELem.classList.add("test");
   mainELem.classList.remove("main-class");
   mainELem.classList.replace("test", "secondary-class");
   console.log("class list:", mainELem.classList);
   
   console.log("does list has test?", mainELem.classList.contains("test"));
   console.log("does list has layout?", mainELem.classList.contains("layout"));

   // toggle - if it there it removes it if it's not it adds it
   // - also returns true/false after toggling
   mainELem.classList.toggle("test");
   console.log("does list has test?", mainELem.classList.contains("test"));
   mainELem.classList.toggle("test");
   console.log("does list has test?", mainELem.classList.contains("test"));
}

// Control Visibility
{
   const mainELem = document.getElementById("main-id");
   
   //mainELem.style.display = "none";  // hides even the space taken by the element
   //mainELem.style.visibility = 'hidden';   // space is vidible, only element is hidden
   mainELem.style.opacity = "0.5";
}