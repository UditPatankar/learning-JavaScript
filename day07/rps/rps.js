/* 
The Rock, Paper, or Scissors Game 
This game will be played between the user and computer
Once the user will select the Rock, Paper, or Scissors and in the next turn the computer will select Rock, Paper, or Scissors.
The winner will be decided based on the following rules :
- Rock can break the Scissors => Rock wins 
- Paper can wrap a Rock => Paper wins 
- Scissors can cut the Paper => Scissor wins 
Ask the user for input and let computer make random selection. 
*/

// Assumptions : 
// 1. We have to prompt the user to get their inputs.
// 2. Computer's selection will be random.
// 3. We have to compare user & computer's choice.
// 4. We have to anounce the winner.
// 5. After announcement, we may want to ask user to play again or quit the game.

console.log("Rock Paper Scissors Game");

function playRockPaperScissors() {

   // Get user choice & validate it
   const userChoicePrompt = prompt("Enter Rock, Paper, or Scissors");
   if(!userChoicePrompt) {
      alert("Game cancelled.");
      return;
   }
   const userChoice = userChoicePrompt.toLowerCase();
   if(!["rock", "paper", "scissors"].includes(userChoice)) {
      alert("Invalid choice! Please enter Rock, Paper, or Scissors.");
      return;
   }

   // Generate computer's choice
   let computerChoice = Math.floor(Math.random() * 3) + 1;
   switch(computerChoice) {
      case 1: 
         computerChoice = "rock";
         break;
      case 2:
         computerChoice = "paper";
         break;
      case 3:
         computerChoice = "scissors";
         break;
   }

   // Decide Winner
   if(userChoice === computerChoice) {
      alert("Tie");
   }
   else if(
      (userChoice === "rock" && computerChoice === "scissors") || 
      (userChoice === "paper" && computerChoice === "rock") || 
      (userChoice === "scissors" && computerChoice === "paper")
   ) {
      alert("Winner : USER\n" + "user choose- " + userChoice + "\ncomputer choose- " + computerChoice);
   }
   else {
      alert("Winner : COMPUTER\n" + "user choose- " + userChoice + "\ncomputer choose- " + computerChoice);
   }

   // Ask user to play again or quit the game
   const playAgain = confirm("Do you want to play again?");

   if(playAgain) {
      playRockPaperScissors();
   }
   else {
      alert("Thanks for playing.");
   }
}
 
playRockPaperScissors();