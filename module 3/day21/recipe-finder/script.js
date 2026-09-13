// Recipe Data -
const recipes = [
  {
    title: "Spaghetti Carbonara",
    ingredients: ["Spaghetti", "Eggs", "Parmesan Cheese", "Bacon"],
    instructions: "Cook pasta. Mix with eggs and cheese. Add bacon."
  },
  {
    title: "Chicken Curry",
    ingredients: ["Chicken", "Curry Powder", "Onions", "Tomatoes"],
    instructions: "Cook onions, add chicken, spices, and tomatoes."
  },
  {
    title: "Grilled Cheese Sandwich",
    ingredients: ["Bread", "Cheddar Cheese", "Butter"],
    instructions: "Butter bread, place cheese between slices, and grill."
  },
  {
    title: "Veggie Stir Fry",
    ingredients: ["Broccoli", "Carrots", "Bell Peppers", "Soy Sauce"],
    instructions: "Stir fry vegetables and add soy sauce."
  }
];

let recipesCopy = [...recipes];

// Get Elements - 
const searchInputEl = document.getElementById("search-input");
const clearBtnEl = document.getElementById("clear-btn");
const recipeListEl = document.getElementById("recipe-list");
const templateEl = document.getElementById("recipe-template");
const noResultEl = document.getElementById("no-results");

// Get the last search - 
let lastInputText = localStorage.getItem("lastInputText") || "";

// Handle recipes rendering - 
function renderRecipes(recipeArr) {
  const fragment = document.createDocumentFragment(); // Primary Fragment 
  recipeArr.forEach(recipe => {
    // clone card 
    const contentClone = templateEl.content.cloneNode(true);
    const card = contentClone.querySelector(".recipe-card");
    const title = card.querySelector(".title");
    const ingredientsList = card.querySelector(".ingredients-list");
    const instructions = card.querySelector(".instructions");

    // populate data 
    title.innerText = recipe.title;
    instructions.innerText = recipe.instructions;
    recipe.ingredients.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      ingredientsList.append(li);
    });

    // append card 
    fragment.append(card);
  });
  recipeListEl.append(fragment);
}

// Handle display
function displayRecipes(recipesToDisplay) {
  recipeListEl.innerHTML = "";
  if(recipesToDisplay.length === 0) {
    recipeListEl.classList.add("hide");
    noResultEl.classList.remove("hide");
  }
  else {
    recipeListEl.classList.remove("hide");
    noResultEl.classList.add("hide");
    recipeListEl.innerHTML = "";
    renderRecipes(recipesToDisplay);
  }
}

// Handle recipe filter -
function filterRecipes(inputText) {
  return recipesCopy.filter((r) => {
    return r.title.toLowerCase().includes(inputText);
  });
}

// Handle search box
function handleSearchBox(e) {
  const inputText = e.target.value.trim().toLowerCase();

  // save search input
  localStorage.setItem("lastInputText", inputText);

  // filter the recipes
  const filteredRecipe = filterRecipes(inputText);
  
  // display recipes
  displayRecipes(filteredRecipe);
};

// Handle clear button
function handleClearBtn(e) {
  searchInputEl.value = "";
  localStorage.setItem("lastInputText", "");
  displayRecipes(recipesCopy);
}

// Handle hiding & displaying recipe details -
function showHideRecipeDetails(e) {
  const target = e.target;
  
  if(!target.classList.contains("title")) return;

  const details = target.parentElement.querySelector(".recipe-details");
  details.classList.toggle("show");
}

// Event Listeners -
recipeListEl.addEventListener("click", (e) => showHideRecipeDetails(e));
searchInputEl.addEventListener("input", (e) => handleSearchBox(e));
clearBtnEl.addEventListener("click", (e) => handleClearBtn(e));

// Render on Page load -
searchInputEl.value = lastInputText;
const initialRecipesArr = filterRecipes(lastInputText);
displayRecipes(initialRecipesArr);