
const toggleInfo = function() {
   const myPara = document.getElementById("myPara");
   const myButton = document.getElementById("myButton");

   const isHidden = myPara.classList.toggle("hideInfo");
   myButton.innerText = isHidden ? "Show Info" : "Hide Info"
}