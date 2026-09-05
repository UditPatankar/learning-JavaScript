// Task Manager - 

let currentEditingTask = null; // track task that's currently in edit

const addTask = function() {
   const taskInput = document.getElementById("task-input");
   const taskText = taskInput.value;
   const addBtn = document.getElementById("add-task-button");
   const list = document.getElementById("tasks-list");
   
   // return if input is empty 
   if(taskText.trim() === "") return;

   // --- Edit Logic ---
   if(currentEditingTask !== null) {
      currentEditingTask.firstElementChild.textContent = taskText;
      currentEditingTask = null;
      taskInput.value = "";
      addBtn.innerText = "Add Task";
      return;
   }

   // --- Normal Logic Flow ---

   // create task item
   const taskItem = document.createElement("li");
   const taskSpan = document.createElement("span");
   taskSpan.innerText = taskText;
   taskItem.append(taskSpan);
   
   // attach delete button
   const deleteBtn = document.createElement("button");
   deleteBtn.innerText = "Delete";
   deleteBtn.classList.add("delete-btn");
   deleteBtn.onclick = () => {
      // currentEditingTask is being deleted - reset the state
      if(taskItem === currentEditingTask) {
         currentEditingTask = null;
         taskInput.value = "";
         addBtn.innerText = "Add Task";
      }
      taskItem.remove();
   }
   taskItem.append(deleteBtn);

   // attach done button
   const doneBtn = document.createElement("button");
   doneBtn.innerText = "Done";
   doneBtn.classList.add("done-btn");
   doneBtn.onclick = () => {
      taskItem.classList.toggle("task-done");
   }
   taskItem.append(doneBtn);

   // attach edit button
   const editBtn = document.createElement("button");
   editBtn.innerText = "Edit";
   editBtn.classList.add("edit-btn");
   editBtn.onclick = () => {
      currentEditingTask = taskItem;
      taskInput.value = taskItem.firstElementChild.textContent;
      taskInput.focus();
      addBtn.innerText = "Add Changes";
   }
   taskItem.append(editBtn);
   
   // append task item
   list.append(taskItem);
   
   // empty the input box
   taskInput.value = "";
}

const filterList = () => {
   const searchInput = document.getElementById("task-search");
   const searchText = searchInput.value.toLowerCase().trim();
   
   const taskItems = document.querySelectorAll("#tasks-list li");

   taskItems.forEach((item) => {
      const taskText = item.firstElementChild.textContent.toLowerCase();

      item.style.display = taskText.includes(searchText) ? "" : "none";
   });
   
}