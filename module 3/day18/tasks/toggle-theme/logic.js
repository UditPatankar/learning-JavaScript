// Local Storage - it store data in key:value pairs & returns string so make sure to handle the return value

const button = document.getElementById("toggleBtn");
const infoPara = document.getElementById("info");

// update UI based on boolean value
function updateUITheme(isDark) {
   document.body.classList.toggle("dark-theme", isDark);
   button.classList.toggle("light-theme", isDark);
   infoPara.innerText = isDark ? "I am Dark theme:)" : "I am Light theme:)";
}

// Toggle on click & save value in local storage
button.addEventListener('click', () => {
   const isDark = !document.body.classList.contains("dark-theme");
   updateUITheme(isDark);
   localStorage.setItem("isDark", isDark);
});

// get & apply saved theme
window.addEventListener('load', () => {
   const isDark = localStorage.getItem("isDark") === "true";
   updateUITheme(isDark);
});

// flash effect
// let flip = false;
// for(let i = 0; i < 30; i++) {
//    flip = !flip;
//    const currentflip = flip;
//    setTimeout(()=> updateUITheme(currentflip), i*100);
// }