// SELECT DOM ELEMENTS -
const themeToggleBtnEl = document.getElementById("theme-toggle-btn");
const searchInputEl = document.getElementById("search-input");
const regionFilterEl = document.getElementById("region-filter");
const statusMessageEl = document.getElementById("status-message");
const countriesGridEl = document.getElementById("countries-grid");
const cardTemplateEl = document.getElementById("card-template");

// SELECT MODAL DOM ELEMENTS -
const detailModalEl = document.getElementById("detail-modal");
const backBtnEl = document.getElementById("back-btn");
const modalFlagEl = document.getElementById("modal-flag");
const modalNameEl = document.getElementById("modal-name");
const modalOfficialNameEl = document.getElementById("modal-official-name");
const modalPopulationEl = document.getElementById("modal-population");
const modalRegionEl = document.getElementById("modal-region");
const modalSubregionEl = document.getElementById("modal-subregion");
const modalCapitalEl = document.getElementById("modal-capital");
const modalTldEl = document.getElementById("modal-tld");
const modalCurrenciesEl = document.getElementById("modal-currencies");
const modalLanguagesEl = document.getElementById("modal-languages");
const modalBordersEl = document.getElementById("modal-borders");

// Global map variable to reset/re-initialize it cleanly
let map = null;

// FETCH ALL COUNTRIES DATA -
let allCountries = [];
async function fetchAllCountries() {
   const base_url = `https://api.restcountries.com/countries/v5`;
   let limit = 100;
   let offset = 0;
   let hasCountriesLeft = true;

   showLoading();

   try{
      while(hasCountriesLeft) {
         const response = await fetch(`${base_url}?limit=${limit}&offset=${offset}`, 
            {headers:{ 'Authorization':`Bearer ${REST_COUNTRIES_API_KEY}`}},
         )
         if(!response.ok) throw new Error(`Failed to fetch the countries batch, HTTP Error: ${response.status}`);
         const result = await response.json();
         const countriesBatch = result.data.objects;
         allCountries = allCountries.concat(countriesBatch);
         offset += limit;
         if(countriesBatch.length < limit) hasCountriesLeft = false;
      }
      console.log(allCountries);
      clearStatus();
      renderCountries(allCountries);
   }
   catch(error) {
      console.log(`Error: ${error.message}`);
      showError(error.message);
   }
}
fetchAllCountries();

// TOGGLE THEME -
function switchTheme(theme) {
   if(theme === "dark") {
      // switch to dark
      document.body.setAttribute("data-theme", "dark");
      themeToggleBtnEl.querySelector("i").className = "fa-regular fa-sun";
      themeToggleBtnEl.querySelector("span").innerText = "Light Mode";
      localStorage.setItem("currentTheme", "dark");
   } 
   else {
      // switch to light
      document.body.removeAttribute("data-theme");
      themeToggleBtnEl.querySelector("i").className = "fa-regular fa-moon";
      themeToggleBtnEl.querySelector("span").innerText = "Dark Mode";
      localStorage.setItem("currentTheme", "light");
   }
}

// INITIAL THEME LOAD -
let savedTheme = localStorage.getItem("currentTheme") || "light";
switchTheme(savedTheme);

// SHOW LOADING STATE
function showLoading() {
   countriesGridEl.innerHTML = "";
   statusMessageEl.classList.remove("hidden");
   statusMessageEl.innerHTML = `
      <div class="spinner"></div>
      <p>Loading countries data...</p>
   `;
}

// SHOW ERROR STATE
function showError(message) {
   countriesGridEl.innerHTML = "";
   statusMessageEl.classList.remove("hidden");
   statusMessageEl.innerHTML = `
      <p class="error-text">⚠️ Something went wrong: ${message}</p>
      <button onclick="fetchAllCountries()">Try Again</button>
   `;
}

// CLEAR STATUS
function clearStatus() {
   statusMessageEl.classList.add("hidden");
   statusMessageEl.innerHTML = "";
}

// RENDER COUNTRIES -
function renderCountries(countries) {
   const fragment = document.createDocumentFragment();
   countries.forEach(country => {
      const card = cardTemplateEl.content.cloneNode(true).querySelector(".country-card");
      const flagImage = card.querySelector(".card-flag").querySelector("img");
      const name = card.querySelector(".country-name");
      const details = card.querySelector(".card-details");

      // attach the identifier to the card
      card.dataset.uuid = country.uuid;

      flagImage.src = country.flag?.url_svg || "https://placehold.co/300x200/e0e0e0/666666?text=Flag+N/A";
      flagImage.alt = `Flag of ${country.names?.common}`;
      name.innerText = country.names?.common;
      details.innerHTML = `
         <p><strong>Population:</strong> ${country.population?.toLocaleString()}</p>
         <p><strong>Region:</strong> ${country.region}</p>
         <p><strong>Capital:</strong> ${country.capitals?.[0]?.name || "N/A"}</p>
      `; 

      fragment.append(card);
   });
   countriesGridEl.innerHTML = "";
   countriesGridEl.append(fragment);
}

// FILTER COUNTRIES BY INPUTS -
function filterCountries() {
   const nameInput = searchInputEl.value.trim().toLowerCase();
   const regionInput = regionFilterEl.value.toLowerCase();
   
   const filteredCountries = allCountries.filter(country => {
      const matchesName = 
         country.names.common?.toLowerCase().includes(nameInput) || 
         country.names.official?.toLowerCase().includes(nameInput);
      const matchesRegion = regionInput === "" || country.region?.toLowerCase() === regionInput;
      return matchesName && matchesRegion;
   });
   
   if(filteredCountries.length === 0) {
      countriesGridEl.innerHTML = "";
      statusMessageEl.classList.remove("hidden");
      statusMessageEl.innerHTML = `<p>No countries matched your search.</p>`;
   }
   else {
      clearStatus();
      renderCountries(filteredCountries);
   }
}

// RENDER MAP -
function renderMap(lat, lng, countryName) {
   // destroy existing map instance
   if(map !== null) {
      map.remove();
      map = null;
   }

   // initialiaze the map on #map-container with coordinates & zoom level
   map = L.map("map-container").setView([lat, lng], 5);

   // Add OpenStreetMap tile layer
   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);

   // Add a pin/marker with a popup
   L.marker([lat, lng]).addTo(map)
      .bindPopup(`<b>${countryName}</b>`)
      .openPopup();
}

// OPEN MODAL -
function openModal(country) {
   // populate the details
   modalFlagEl.src = country.flag?.url_png || "https://placehold.co/300x200/e0e0e0/666666?text=Flag+N/A";
   modalFlagEl.alt = `Flag of ${country.names?.common}`;
   modalNameEl.innerText = country.names?.common || "N/A";
   modalOfficialNameEl.innerText = country.names?.official || "N/A";
   modalPopulationEl.innerText = country.population?.toLocaleString();
   modalRegionEl.innerText = country.region || "N/A";
   modalSubregionEl.innerText = country.subregion || "N/A";
   modalCapitalEl.innerText = country.capitals?.[0]?.name || "N/A";
   modalTldEl.innerText = country.tlds?.join(", ") || "N/A";

   // format objects/arrays for currencies & languages
   const currencies = country.currencies ? country.currencies.map(c => c.name).join(", ") : "N/A";
   const languages = country.languages ? country.languages.map(l => l.name).join(", ") : "N/A";

   modalCurrenciesEl.innerText = currencies;
   modalLanguagesEl.innerText = languages;

   // render border buttons
   modalBordersEl.innerHTML = "";
   if(country.borders && country.borders.length > 0) {
      country.borders.forEach(borderCode => {
         const btn = document.createElement("button");
         btn.className = "border-btn";

         // find country with this border code
         const borderCountry = allCountries.find(c => c.codes?.alpha_3 === borderCode);
         btn.innerText = borderCountry ? borderCountry.names?.common : "N/A";

         // Clicking a border button directly switches modal content
         btn.addEventListener("click", () => {
            if (borderCountry) openModal(borderCountry);
         });

         modalBordersEl.appendChild(btn);
      });
   }
   else {
      modalBordersEl.innerText = "None";
   }

   // Show Modal Overlay
   detailModalEl.classList.remove("hidden");

   // Render Map (default to [0, 0] if coordinates missing)
   const lat = country.coordinates?.lat || 0;
   const lng = country.coordinates?.lng || 0;
   
   // Invalidate map size so Leaflet calculates dimensions correctly inside a newly visible modal
   setTimeout(() => {
      renderMap(lat, lng, country.names?.common || "Country");
      if (map) map.invalidateSize();
   }, 100);
}

// EVENT LISTENERS -
searchInputEl.addEventListener("input", filterCountries);
regionFilterEl.addEventListener("change", filterCountries);
themeToggleBtnEl.addEventListener("click", ()=>{
   let currentTheme = localStorage.getItem("currentTheme") || "light";
   let nextTheme = currentTheme === "dark" ? "light" : "dark";
   switchTheme(nextTheme);
});
countriesGridEl.addEventListener("click", (e) => {
   const cardEl = e.target.closest(".country-card");
   if(!cardEl) return;
   const uuid = cardEl.dataset.uuid;
   const country = allCountries.find(country => country.uuid === uuid);
   if(country) openModal(country);
});
backBtnEl.addEventListener("click", () => {
   detailModalEl.classList.add("hidden");
});