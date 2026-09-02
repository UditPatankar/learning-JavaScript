console.log("Expense Tracker -");

// Expense Tracker Project -
// Project Requirements
// Create a simple expense tracker where user can add, remove, edit, and categorize expenses.

// Please Note: This will be a console-based project (no DOM), focusing only on JavaScript logic.

// Features to Implement
// Create a createExpenseTracker() function that takes a username and an initial budget to expose the following functioanlities:

// Adding Expense
// Removing Expense
// Updating Expense
// Getting total expenses done by the user
// Getting expense by category
// Get the Highest Expense
// Get the Lowest Expense
// Get the user info
// Show all the expenses
// Update User data
// Please make use of the factory function, closure to keep data private and return only the required features/methods.

// Sample User Data Structure
//  user: {
//     name: "Tapas",
//     budget: 5000,
//   },
// Sample Expense Data Structure
// expenses: [
//     { id: 1, amount: 200, category: "Food", description: "Lunch" },
//     { id: 2, amount: 500, category: "Shopping", description: "New Shoes" },
// ],

function createExpenseTracker(username, initialBudget) {
   let user = {
      name: username,
      budget: initialBudget
   }
   let expenses = [];
   let nextID = 1;

   // return the helper methods
   return {
      // 1. Add expense
      addExpense(amount, category, description) {
         const newExpense = {
            id : nextID++,
            amount: amount, 
            category: category,
            description: description
         }
         expenses.push(newExpense);
         return `Added New Expense: ${description} ($${amount})`;
      },

      // 2. Remove expense 
      removeExpense(id) {
         const index = expenses.findIndex((exp) => exp.id === id);
         if(index !== -1) {
            const removed = expenses.splice(index, 1);
            return `Removed Expense ID ${id}: ${removed[0].description}`;
         }
         return `Expense with ID ${id} not found!`;
      },

      // 3. Update expense 
      updateExpense(id, updatedDetails) {
         const targetExpense = expenses.find((item) => item.id === id);
         if(targetExpense) {
            Object.assign(targetExpense, updatedDetails);
            return 'Updated the expense';
         }
         return `Expense with ID ${id} not found!`;
      },

      // 4. Total expenses
      getTotalExpenses() {
         return expenses.reduce((total, expense) => total + expense.amount, 0);
      },

      // 5. Expense by category
      getExpensesByCategory(category) {
         return expenses.filter((item) => item.category.toLowerCase() === category.toLowerCase());
      }, 

      // 6. Highest Expense
      getHighestExpense() {
         if(expenses.length === 0) return 'No expense';
         return expenses.reduce((max, expense) => 
            expense.amount > max.amount ? expense : max
         );
      }, 

      // 7. Lowest Expense
      getLowestExpense() {
         if(expenses.length === 0) return 'No expense';
         return expenses.reduce((min, expense) => 
            expense.amount < min.amount ? expense : min
         );
      }, 

      // 8. User Information
      getUserInfo() {
         return {...user};
      }, 

      // 9. Show all the expenses
      getAllExpenses() {
         return [...expenses];
      },

      // 10. Update User data
      updateUserDetails(newDetails) {
         Object.assign(user, newDetails);
         return 'Update the user profile successfully';
      }
   }
}

// Usage - 
const tracker = createExpenseTracker("Udit", 5000);

console.log(tracker.addExpense(200, "Food", "Lunch"));
console.log(tracker.addExpense(200, "Study", "Note Book"));
console.log(tracker.addExpense(200, "Study", "Color Pens"));
console.log(tracker.addExpense(1000, "Shopping", "New Shoes"));
console.log(tracker.addExpense(500, "Shopping", "T-shirt"));
console.log(tracker.addExpense(1500, "Rent", "Apartment Rent"));

console.log("Total Expenses:", tracker.getTotalExpenses());
console.log("Shopping Expenses:", tracker.getExpensesByCategory("shopping"));
console.log("Highest Expense:", tracker.getHighestExpense());
console.log("Lowest Expense:", tracker.getLowestExpense());

console.log(tracker.updateExpense(1, { amount: 250, description: "Team Lunch" }));
console.log(tracker.removeExpense(1));

console.log("User Info:", tracker.getUserInfo());
console.log("All Expenses:", tracker.getAllExpenses());
console.log(tracker.updateUserDetails({ budget: 6000 }));