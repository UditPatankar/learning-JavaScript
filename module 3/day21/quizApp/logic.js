// Quiz Data 
const quizData = [
   {
      question: "Which method is used to select an element by its ID in the DOM?",
      options: [
         "getElementById()",
         "getElementsByClassName()",
         "querySelector()",
         "getElementByTagName()"
      ],
      correct: "getElementById()"
   },
   {
      question: "What is the correct way to write a JavaScript array?",
      options: [
         "const colors = (1:'red', 2:'green', 3:'blue')",
         "const colors = ['red', 'green', 'blue']",
         "const colors = 'red', 'green', 'blue'",
         "const colors = 1 = ('red'), 2 = ('green')"
      ],
      correct: "const colors = ['red', 'green', 'blue']"
   },
   {
      question: "Which property is used to change the text content of a DOM element?",
      options: [
         "content",
         "htmlText",
         "textContent",
         "style"
      ],
      correct: "textContent"
   },
   {
      question: "How do you create a new element in the DOM using JavaScript?",
      options: [
         "document.createElement()",
         "document.newElement()",
         "document.makeElement()",
         "document.appendChild()"
      ],
      correct: "document.createElement()"
   },
   {
      question: "Which operator is used to check both value and type equality in JavaScript?",
      options: [
         "=",
         "==",
         "===",
         "&&"
      ],
      correct: "==="
   },
   {
      question: "How do you add a click event listener to a button element stored in a variable named 'btn'?",
      options: [
         "btn.listen('click', myFunction)",
         "btn.addEventListener('click', myFunction)",
         "btn.onclick(myFunction)",
         "btn.attachEvent('onclick', myFunction)"
      ],
      correct: "btn.addEventListener('click', myFunction)"
   },
   {
      question: "What does the 'document.querySelectorAll()' method return?",
      options: [
         "A single HTML element",
         "An HTMLCollection",
         "A static NodeList",
         "An array of strings"
      ],
      correct: "A static NodeList"
   },
   {
      question: "Which keyword is used to declare a block-scoped variable that can be reassigned?",
      options: [
         "var",
         "let",
         "const",
         "define"
      ],
      correct: "let"
   },
   {
      question: "How do you remove an existing class from a DOM element's class list?",
      options: [
         "element.classes.delete('className')",
         "element.className.remove('className')",
         "element.classList.remove('className')",
         "element.removeClass('className')"
      ],
      correct: "element.classList.remove('className')"
   },
   {
      question: "What will `console.log(typeof NaN)` output to the console?",
      options: [
         "number",
         "NaN",
         "undefined",
         "null"
      ],
      correct: "number"
   }
];

// Get ELements -
const welcomeScreenEl = document.getElementById("welcome-screen");
const startBtn = document.getElementById("start-btn");
const quizScreenEl = document.getElementById("quiz-screen");
const timeLeftEl = document.getElementById("timeleft");
const questionEL = document.getElementById("question-box");
const optionsEl = document.getElementById("options-box");
const nextBtnEl = document.getElementById("next-btn");
const scoreScreenEL = document.getElementById("score-screen");
const scoreEl = document.getElementById("score");
const restartBtnEl = document.getElementById("restart-btn");

// Handle questions shuffling -
function shuffleQuestions() {
   return ((arr) => {
      for(let i = arr.length-1; i > 0; i--) {
         let j = Math.floor(Math.random() * (i+1));
         [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
   })([...quizData]); // IIFE
}

// Get shuffled questions -
let questions = [];

// Trackers -
let currentQuestion = 0;
let userScore = 0;
let timeLeft = 15;
let intervalId;
let highestScore = localStorage.getItem("highestScore") || 0;
let isNew = false;


// Handle questions loading -
function loadQuestion() {
   // update question
   const q = questions[currentQuestion];
   questionEL.innerText = `${currentQuestion + 1}. ${q.question}`;  

   // update options
   const optionsFragment = document.createDocumentFragment();
   const optionButton = document.createElement("button");

   q.options.forEach((opt) => {
      const btn = optionButton.cloneNode(true);
      btn.innerText = opt;

      optionsFragment.append(btn);
   });
   optionsEl.innerHTML = "";  //clear previous options
   optionsEl.append(optionsFragment);  

   nextBtnEl.disabled = true; // disable next button
   if(currentQuestion === questions.length-1) nextBtnEl.innerText = "Show Score";   // update button for last question
   else nextBtnEl.innerText = "Next Question";

   // start timer
   timeLeft = 15;
   timeLeftEl.innerText = timeLeft; // start fresh
   clearInterval(intervalId); // clear previous interval
   intervalId = setInterval(handleTimer, 1000); // start timer
}

// Handle timer -
function handleTimer() {
   timeLeft--;
   timeLeftEl.innerText = timeLeft;

   const correctOption = questions[currentQuestion].correct;
   
   if(timeLeft === 0) {
      showAnswer(correctOption); // hihglight answer
      nextBtnEl.disabled = false;   // enable next button
   }
}

// Load first question -
function startQuiz() {
   welcomeScreenEl.classList.add("hide");
   quizScreenEl.classList.remove("hide");
   questions = shuffleQuestions();
   loadQuestion();
}

// Handle show score - 
function showScore() {
   if(userScore > highestScore) {
      localStorage.setItem("highestScore", userScore);
      isNew = true;
   }
   highestScore = localStorage.getItem("highestScore") || 0;
   
   scoreEl.innerHTML = `
      <p>You have scored ${userScore} out of ${questions.length}.</p>
      <p>The highest score is: ${highestScore}</p>
      ${isNew ? "<p>Hey, You set the New High Score!</p>" : ""}
   `;
   
   nextBtnEl.innerText = "Next Question";
   quizScreenEl.classList.add("hide");
   scoreScreenEL.classList.remove("hide");
}

// Handle option selection & Score-
function handleOptionSelection(e) {
   if(e.target.tagName !== "BUTTON") return;

   const selectedBtn = e.target;
   const selectedOption = selectedBtn.innerText;
   const correctOption = questions[currentQuestion].correct;

   // highlight answer & disable all buttons
   showAnswer(correctOption);
   
   if(selectedOption === correctOption) {
      userScore++;
   }
   else {
      selectedBtn.classList.add("incorrect");
   }

   // enable next button
   nextBtnEl.disabled = false;
}

// Highlight answer & disable all buttons
function showAnswer(correctOption) {
   clearInterval(intervalId);
   const allOptionBtn = [...optionsEl.children];
   allOptionBtn.forEach((btn) => {
      if(btn.innerText === correctOption) btn.classList.add("correct");
      btn.disabled = true;
   });
}

// Handle next button -
function handleNextButton() {
   if(currentQuestion === questions.length-1) {
      showScore();
   } 
   else {
      currentQuestion++;
      loadQuestion();
   }
}

// Handle restart button -
function handleRestartButton() {
   currentQuestion = 0;
   userScore = 0;
   questions = shuffleQuestions();
   quizScreenEl.classList.remove("hide");
   scoreScreenEL.classList.add("hide");
   loadQuestion();
}

// Event Handlers - 
startBtn.addEventListener("click", () => startQuiz());
optionsEl.addEventListener("click", (e) => handleOptionSelection(e));
nextBtnEl.addEventListener("click", () => handleNextButton());
restartBtnEl.addEventListener("click", () => handleRestartButton());
