/* 
Build an app that lets users search movies using the OMDB API: http://www.omdbapi.com/?apikey=yourkey&s=movieName
*/
const API_KEY = "ace975c4";

// Select DOM Elements -
const searchBoxEl = document.getElementById("search-box");
const searchBtnEl = document.getElementById("search-btn");
const cardTemplate = document.getElementById("card-template");
const moviesContainerEl = document.getElementById("movies-container");
const errorEl = document.getElementById("not-found");

// Get Movies -
async function getMovies(inputTitle) {
   const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${inputTitle}`;

   try {
      const response = await fetch(URL);
      if(!response.ok) {
         if (response.status === 404) {
            throw new Error("The requested user could not be found (404).");
         }
         throw new Error(`Server returned an error status: ${response.status}`);
      }
      const data = await response.json();
      if(data.Response === "False") throw new Error(data.Error);
      return data.Search;
   }
   catch(err) {
      console.error(err.message);
      displayError(err.message);
   }
}

// Display Movies -
async function displayMovies() {

   errorEl.classList.add("hide");
   moviesContainerEl.innerHTML = "";

   // get the input:
   const input = searchBoxEl.value.trim().toLowerCase();
   if(input === "") return;

   // get list:
   const movieList = await getMovies(input);
   if(!movieList) return;

   // update the DOM:
   const primaryFrag = document.createDocumentFragment();

   movieList.forEach((movie) => {
      const card = cardTemplate.content.cloneNode(true).querySelector(".card");
      const posterSrc = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster";
      
      card.querySelector(".poster").setAttribute("src", posterSrc);
      card.querySelector(".title").innerText = movie.Title;
      card.querySelector(".type").innerText = movie.Type;
      card.querySelector(".year").innerText = movie.Year;

      primaryFrag.append(card);
   });

   moviesContainerEl.append(primaryFrag);
   moviesContainerEl.classList.remove("hide");
}

function displayError(error) {
   errorEl.innerText = error;
   errorEl.classList.remove("hide");
   moviesContainerEl.classList.add("hide");
}

// Event Listners -
searchBtnEl.addEventListener("click", displayMovies);
searchBoxEl.addEventListener("keydown", (e) => {
   if (e.key === "Enter") displayMovies();
});