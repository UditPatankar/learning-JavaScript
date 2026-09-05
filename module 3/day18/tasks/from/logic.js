/* 
Create a form dynamically using JavaScript and manipulate its behavior
Add input fields dynamically based on user selection e.g., text, email, number
Add a submit button that logs all the input values as an object.
Add a reset button that clears the form.
Use createElement, appendChild, setAttribute, and addEventListener.
*/

const formContainer = document.getElementById("formContainer");
const fieldTypeSelect = document.getElementById("fieldType");
const addInputBtn = document.getElementById("addFieldBtn");

let fieldCounter = 0;

// create form element 
const dynamicForm = document.createElement("form");
dynamicForm.setAttribute("id", "userForm");

// create input wrapper 
const inputWrapper = document.createElement("div");
inputWrapper.setAttribute("id", "inputWrapper");

// add submit button 
const submitBtn = document.createElement("button");
submitBtn.innerText = "Submit";
submitBtn.setAttribute("id", "submitBtn");
submitBtn.setAttribute("type", "submit");

// reset button
const resetBtn = document.createElement("button");
resetBtn.innerText = "Reset";
resetBtn.setAttribute("id", "resetBtn");
resetBtn.setAttribute("type", "button");

// append form
dynamicForm.append(inputWrapper);
dynamicForm.append(submitBtn);
dynamicForm.append(resetBtn);
formContainer.append(dynamicForm);

// Add input fields
addInputBtn.addEventListener('click', () => {
   const selectedType = fieldTypeSelect.value;
   if(selectedType === "") return;

   fieldCounter++;
   const fieldId = `field_${fieldCounter}`;

   // create group div
   const grpDiv = document.createElement("div");
   grpDiv.className = "grpDiv";

   // create label
   const label = document.createElement("label");
   label.setAttribute("for", fieldId);
   label.textContent = `${fieldCounter} ${selectedType}`

   // create input 
   const input = document.createElement("input");
   input.setAttribute("type", selectedType);
   input.setAttribute("id", fieldId);
   input.setAttribute("name", `${fieldCounter}_${selectedType}`);
   input.setAttribute("placeholder", `Enter ${selectedType}`);

   grpDiv.append(label);
   grpDiv.append(input);
   inputWrapper.append(grpDiv);

   fieldTypeSelect.value = "";
});

// handle submission
submitBtn.addEventListener('click', (event)=> {
   event.preventDefault();

   const formDataObject = {};
   const inputs = document.querySelectorAll("input");

   inputs.forEach((input) => {
      formDataObject[input.name] = input.value;
   });

   console.log("Submitted Data:", formDataObject);
});

// handle reset 
resetBtn.addEventListener('click', (event) => {
   dynamicForm.reset();
   console.log("form cleared");
});