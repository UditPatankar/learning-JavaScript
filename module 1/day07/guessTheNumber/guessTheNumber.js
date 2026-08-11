/* 
The Guessing Number Game 
You will ask the user to enter number between 1 to 10.
Once user enters the number, you will tell the user it the entered number is lower or higher.
With this information user changes the number and finally guess the right number.
You also need to ahow the number of attempts user took to to guess the right number.Game 
*/

function guessTheNumber() {

   // generate the number
   let secretNumber = Math.floor(Math.random() * 10) + 1;
   console.log(secretNumber);

   let userGuess;
   let attempts = 0;

   while(true) {
      userGuess = prompt("Guess the number between 1 and 10");

      // if user cancels the game
      if(userGuess === null) {
         alert("Game cancelled.");
         return;
      }

      // validate the input 
      let guess = Number(userGuess);
      if(guess < 1 || guess > 10 || isNaN(guess)) {
         alert("Invalid input!");
         continue;
      }

      attempts++;

      if(guess === secretNumber) {
         alert("Congrats! you guessed the it in " + attempts + " attempts");
         break;
      }
      else if(guess > secretNumber) {
         alert("Too High!");
      }
      else {
         alert("Too Low!");
      }
   }
}

// start the game
guessTheNumber();