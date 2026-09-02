// What is DOM? 
   // An programming interface for web documents that represents HTML/XML document as a tree of "Objects",
   // and this allows langs like JS to access, read, manipulate & change the document's structure, style or content
   // * Tree structure - Browser converts HTML document into a hierarchical tree of nodes(element, attributes, text)
   // * Nodes - Every part of the document (<h1>, id="one", <span>) is represented as a 'node object' in the DOM
   // * JavaScript Interaction - Devs uses the DOM API methods to select & alter the elements on live webpage w/o needing to refresh the page.

// DOM Types -
   // Document : provided by JS, represents the entire page & is the root node of the page.
   console.log(document);
   // Node - A generic for an element in the DOM tree. Element node, Attribute node, Text node.
   // Element - an specific node type that represents the HTML tag/element.
   // NodeList - an Array of nodes.
   // Attr - represents the attribute of a node.
   // NameNode - A collection of Attr.

// Access the element- -

// By ID
let headingElem = document.getElementById("heading");
console.log(headingElem);

// By Class name
let infoElems = document.getElementsByClassName("info");
console.log(infoElems); // array like
[...infoElems].forEach((el) => console.log(el));

// By Tag name
let pTagElems = document.getElementsByTagName("p");
console.log(pTagElems);
[...pTagElems].forEach((el) => console.log(el));

// Selectors - pass the cssSelector
// querySelector() - returns the first matching element
// querySelectorAll() - returns NodeList of all the matching elements
let paraElem = document.querySelector('p.info');
console.log('using query selector',  paraElem);

let paraELems = document.querySelectorAll('p.info');
console.log('using query selectorAll', paraELems);

let hOne = document.querySelector("#heading");
console.log("using query selector", hOne);

// MINI Project - Highlighter App

let isHighlighted = false;

function highlightText() {
   let paraElems = document.querySelectorAll('p.info');
   if(!isHighlighted) {
      paraElems.forEach((para) => {
         para.style.backgroundColor = "yellow";
         para.style.color = "black";
      });
      isHighlighted = true;
   }
   else {
      paraElems.forEach((para) => {
         para.style.backgroundColor = "";
         para.style.color = "";
      });
      isHighlighted = false;
   }
}

// MINI Project - filter list 

function filterList() {
   let input = document.getElementById("searchInput").value;
   let itemsElems = document.querySelectorAll('ul#itemList li');
   itemsElems.forEach((item) => {
      item.style.display = item.innerText.toLowerCase().includes(input.toLowerCase()) ? "block" : "none";
   });
}