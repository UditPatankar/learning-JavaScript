import { libraryInventory, registeredMembers, systemAdmin, ADMIN_PASSCODE } from "./scripts/data.js";

// --- SELECT BASE DOM VIEWS ---
const errorMsgEl = document.getElementById("error-msg");
const authSectionEl = document.getElementById("auth-section");
const roleSelectionEl = document.getElementById("role-select");
const adminPasscodeGroupEl = document.getElementById("admin-passcode-group");
const adminPasscodeInputEl = document.getElementById("admin-passcode-input");
const memberIDGroupEl = document.getElementById("member-id-group");
const memberIDInputEl = document.getElementById("member-id-input");
const loginBtnEl = document.getElementById("login-btn");
const dashboardSectionEl = document.getElementById("dashboard-section");
const adminPanelEL = document.getElementById("admin-panel");
const memberPanelEL = document.getElementById("member-panel");
const bookListEl = document.getElementById("book-list");
const currentMemberDisplayEl = document.getElementById("current-member-display");
const logoutBtnEl = document.getElementById("logout-btn");

// --- SELECT ADMIN INPUT FORMS & FIELDS ---
const addBookFormEl = document.getElementById("add-book-form");
const isbnInputEl = document.getElementById("isbn");
const titleInputEl = document.getElementById("title");
const authorInputEl = document.getElementById("author");
const genreInputEl = document.getElementById("genre");
const pubYearInputEl = document.getElementById("pub-year");
const publisherInputEl = document.getElementById("publisher");

const deleteBookFormEl = document.getElementById("delete-book-form");
const deleteIsbnInputEl = document.getElementById("delete-isbn");

// --- SELECT MEMBER ACTION COMPONENTS ---
const actionIsbnInputEl = document.getElementById("action-isbn");
const borrowBtnEl = document.getElementById("borrow-btn");
const returnBtnEl = document.getElementById("return-btn");

// --- APP RUNTIME STATE ---
let currentUser = null;

// --- LAYOUT LIST RENDER ENGINE ---
function renderInventory() {
   bookListEl.innerHTML = "";

   if (libraryInventory.size === 0) {
      bookListEl.innerHTML = `<p class="placeholder-text">No books in inventory yet.</p>`;
      return;
   }
   
   libraryInventory.forEach((book, isbn) => {
      const bookItem = document.createElement("div");
      bookItem.className = "book-item";

      const isAvailable = book.availableCopies > 0;
      const badgeClass = isAvailable ? "badge available" : "badge borrowed";
      const badgeText = isAvailable ? `${book.availableCopies} Available` : "Out of Stock";

      bookItem.innerHTML = `
         <div class="book-info">
            <h4>${book.title}</h4>
            <p><strong>Author:</strong> ${book.author} | <strong>ISBN:</strong> ${isbn}</p>
            <p><small>Genre: ${book.genre} | Year: ${book.publicationYear} | Publisher: ${book.publisher}</small></p>
            <p><small style="color:#7f8c8d;">Total System Stock: ${book.totalCopies}</small></p>
         </div>
         <div>
            <span class="${badgeClass}">${badgeText}</span>
         </div>
      `;
      bookListEl.appendChild(bookItem);
   });
}

// --- DISPLAY ERROR UTILITY ---
function displayError(message) {
   if (message) {
      errorMsgEl.innerText = message;
      errorMsgEl.classList.remove("hidden");
   } else {
      errorMsgEl.innerText = "";
      errorMsgEl.classList.add("hidden");
   }
}

// --- INTERACTION FLOW HANDLING ---
function handleRoleSelection(e) {
   const selectedRole = e.target.value;
   adminPasscodeInputEl.value = "";
   memberIDInputEl.value = "";
   displayError(); 

   if (selectedRole === '') { 
      loginBtnEl.disabled = true; 
      adminPasscodeGroupEl.classList.add("hidden");
      memberIDGroupEl.classList.add("hidden");
      return; 
   }
   
   loginBtnEl.disabled = false;
   if (selectedRole === 'admin') {
      memberIDGroupEl.classList.add("hidden");
      adminPasscodeGroupEl.classList.remove("hidden");
   } else {
      adminPasscodeGroupEl.classList.add("hidden");
      memberIDGroupEl.classList.remove("hidden");
   }
}

function handleLogin() {
   const selectedRole = roleSelectionEl.value;

   if (selectedRole === "admin") {
      if (adminPasscodeInputEl.value.trim() === ADMIN_PASSCODE) {
         currentUser = systemAdmin;
         setupDashboardView("admin");
      } else {
         displayError("Incorrect Passcode. Access denied.");
      }
   } else {
      const inputID = memberIDInputEl.value.trim();
      if (!registeredMembers.has(inputID)) {
         displayError("Member not found. Access denied.");
         return;
      }
      currentUser = registeredMembers.get(inputID); 
      setupDashboardView("member");
   }
}

function setupDashboardView(role) {
   displayError(); 
   authSectionEl.classList.add("hidden");
   dashboardSectionEl.classList.remove("hidden");
   renderInventory();

   if (role === "admin") {
      adminPanelEL.classList.remove("hidden");
      memberPanelEL.classList.add("hidden");
   } else {
      memberPanelEL.classList.remove("hidden");
      adminPanelEL.classList.add("hidden");
      currentMemberDisplayEl.innerText = `${currentUser.name}`;
   }
}

function handleLogout() {
   currentUser = null;
   roleSelectionEl.value = "";
   dashboardSectionEl.classList.add("hidden");
   authSectionEl.classList.remove("hidden");
   displayError();
}

// --- TRANSACTION EXECUTORS ---

// Submitting Complete Book Creation Form
addBookFormEl.addEventListener("submit", (e) => {
   e.preventDefault();
   const res = currentUser.addBook(
      libraryInventory,
      isbnInputEl.value.trim(),
      titleInputEl.value.trim(),
      authorInputEl.value.trim(),
      genreInputEl.value.trim(),
      pubYearInputEl.value.trim(),
      publisherInputEl.value.trim()
   );
   if (res.success) {
      addBookFormEl.reset();
      renderInventory();
      alert(res.message);
   }
});

// Submitting Target Book Deletion Form
deleteBookFormEl.addEventListener("submit", (e) => {
   e.preventDefault();
   const targetIsbn = deleteIsbnInputEl.value.trim();
   const res = currentUser.removeBook(libraryInventory, targetIsbn);
   
   if (res.success) {
      deleteBookFormEl.reset();
      renderInventory();
      displayError();
      alert(res.message);
   } else {
      displayError(res.message);
   }
});

// Member Action: Borrow execution
borrowBtnEl.addEventListener("click", () => {
   const isbn = actionIsbnInputEl.value.trim();
   if (!isbn) return displayError("ISBN required.");
   const res = currentUser.borrowBook(libraryInventory, isbn);
   if (res.success) {
      actionIsbnInputEl.value = "";
      renderInventory();
      displayError();
      alert(res.message);
   } else {
      displayError(res.message);
   }
});

// Member Action: Return execution
returnBtnEl.addEventListener("click", () => {
   const isbn = actionIsbnInputEl.value.trim();
   if (!isbn) return displayError("ISBN required.");
   const res = currentUser.returnBook(libraryInventory, isbn);
   if (res.success) {
      actionIsbnInputEl.value = "";
      renderInventory();
      displayError();
      alert(res.message);
   } else {
      displayError(res.message);
   }
});

// --- CORE SYSTEM LISTENERS ---
roleSelectionEl.addEventListener("change", handleRoleSelection);
loginBtnEl.addEventListener("click", handleLogin);
logoutBtnEl.addEventListener("click", handleLogout);
