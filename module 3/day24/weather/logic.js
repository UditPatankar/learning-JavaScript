// Weather App
const API_KEY = ""; 

// Select DOM Elements
const inputBoxEl = document.getElementById("search-box");
const searchBtnEl = document.getElementById("search-btn");
const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const descriptionEl = document.getElementById("description");
const detailSectionEl = document.getElementById("weather-detail-section");
const errorEl = document.getElementById("not-found");

// Get Weather Info
async function getWeather(city) {
   const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

   try{
      const response = await fetch(URL);
      if(!response.ok) throw new Error(`City not found (${response.status})`);
      const data = await response.json();
      const weatherInfo = {
         city: data.name,
         temp: data.main.temp,
         humidity: data.main.humidity,
         condition: data.weather[0].description,
         windSpeed: data.wind.speed
      }
      console.log("Weather data:", weatherInfo);
      return weatherInfo;
   }
   catch(error) {
      console.error("Failed to fetch weather data:", error.message);
      displayError(error.message);
      return null;
   }
}

// Function to pick a matching emoji
function getWeatherEmoji(condition) {
   const desc = condition.toLowerCase();
   if (desc.includes("clear")) return "☀️";
   if (desc.includes("cloud")) return "☁️";
   if (desc.includes("rain") || desc.includes("drizzle")) return "🌧️";
   if (desc.includes("thunderstorm")) return "⛈️";
   if (desc.includes("snow")) return "❄️";
   if (desc.includes("mist") || desc.includes("fog")) return "🌫️";
   return "🌡️"; // Default fallback emoji
}

// Display Weather -
async function displayWeather() {
   const inputCity = inputBoxEl.value.trim().toLowerCase();
   if(inputCity === "") return;
   // clear UI
   errorEl.classList.add("hide");
   detailSectionEl.classList.add("hide");
   // fetch data, if failed - display error
   const weatherInfo = await getWeather(inputCity);
   if(!weatherInfo) return;
   // if fetched display data
   const emoji = getWeatherEmoji(weatherInfo.condition);
   cityEl.innerText = weatherInfo.city;
   tempEl.innerText = `${Math.round(weatherInfo.temp)}°C ${emoji}`;
   descriptionEl.innerText = `Humidity: ${weatherInfo.humidity}%, Condition: ${weatherInfo.condition}, Wind: ${weatherInfo.windSpeed} m/s`;
   
   detailSectionEl.classList.remove("hide");
}

// Display Error -
function displayError(errorMessage) {
   errorEl.innerText = errorMessage;
   errorEl.classList.remove("hide");
   detailSectionEl.classList.add("hide");
}

// Handle Search 
searchBtnEl.addEventListener("click", displayWeather);
inputBoxEl.addEventListener("keydown", (e) => {
   if (e.key === "Enter") displayWeather();
});

// Default City -
(() => {
   inputBoxEl.value = "Delhi";
   displayWeather();
})();