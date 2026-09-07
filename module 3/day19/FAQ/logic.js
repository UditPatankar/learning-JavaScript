const faqList = [
  {
    question: "What is the DOM?",
    answer: "The Document Object Model (DOM) is a programming interface for HTML documents that represents the page structure as a tree of objects."
  },
  {
    question: "What is the difference between querySelector and querySelectorAll?",
    answer: "querySelector returns the first matching element, while querySelectorAll returns a NodeList of all matching elements."
  },
  {
    question: "How do you attach a click event listener in JavaScript?",
    answer: "You use element.addEventListener('click', callbackFunction) to trigger code when an element is clicked."
  },
  {
    question: "How do you toggle a CSS class on an element?",
    answer: "You use element.classList.toggle('className') to add the class if it is missing or remove it if present."
  },
  {
    question: "What is element.nextElementSibling used for?",
    answer: "It targets the immediate next sibling element in the same parent container, useful for opening an answer panel right below a clicked question button."
  }
];

// load the faqs
faqList.forEach((item) => {
   // container
   const container = document.createElement('div');
   container.classList.add('container');

   // question
   const questionHeading = document.createElement('h3');
   questionHeading.classList.add('question');
   questionHeading.textContent = item.question;

   // answer
   const answerPara = document.createElement('p');
   answerPara.classList.add('answer');
   answerPara.textContent = item.answer;

   // container( question, answer )
   container.appendChild(questionHeading);
   container.appendChild(answerPara);

   // append to body 
   document.body.appendChild(container);
});

// Add eventListner on parent - event delegation
document.addEventListener("click", (e) => {
   const target = e.target;

   // clicked on question 
   if (target.classList.contains("question")) {
      const answer = target.nextElementSibling;
      answer.classList.toggle("show");
      return;
   }

   // Clicked outside any question (close all answers)
   const answerList = document.querySelectorAll(".answer");
   answerList.forEach((answer) => {
      answer.classList.toggle("show", false);
   });
});