// CLipboard API
const copyBtn = document.getElementById("copy-btn");
const textArea = document.getElementById("textToCopy");
const statusEl = document.getElementById("status");

copyBtn.addEventListener("click", async () => {
   try {
      const text = textArea.value;
      if (!navigator.clipboard) {
         console.log("Clipboard API not supported on this browser.");
         return;
      }

      await navigator.clipboard.writeText(text);
      statusEl.textContent = "Copied to clipboard.";
      statusEl.style.color = "green";
   }
   catch(error) {
      statusEl.textContent = "Failed to copy!";
      statusEl.style.color = "red";
      console.error("Failed", error);
   }
});

// LocalStorage - already know

// Geolocation -
const geoBtn = document.getElementById("geo-btn");

geoBtn.addEventListener("click", () => {
   // 1. Check if the Geolocation API is supported by the browser
   if (!navigator.geolocation) {
      statusEl.textContent = "Geolocation is not supported by your browser.";
      statusEl.style.color = "red";
      return;
   }

   statusEl.textContent = "Locating...";
   statusEl.style.color = "orange";

   // 2. Success callback function
   const success = (position) => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;

      statusEl.textContent = `Location found! Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
      statusEl.style.color = "green";
      
      console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
   };

   // 3. Error callback function
   const error = (err) => {
      statusEl.style.color = "red";
      switch(err.code) {
         case err.PERMISSION_DENIED:
            statusEl.textContent = "User denied the request for Geolocation.";
            break;
         case err.POSITION_UNAVAILABLE:
            statusEl.textContent = "Location information is unavailable.";
            break;
         case err.TIMEOUT:
            statusEl.textContent = "The request to get user location timed out.";
            break;
         default:
            statusEl.textContent = "An unknown error occurred.";
            break;
      }
      console.error(`Error (${err.code}): ${err.message}`);
   };

   // 4. Request the current position
   navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true, // Requests best possible results (uses GPS if available)
      timeout: 5000,            // Stop trying after 5 seconds
      maximumAge: 0             // Do not use a cached location
   });
});
