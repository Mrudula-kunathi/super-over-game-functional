const strikeButton = document.getElementById("strike");
const resetButton = document.getElementById("reset");
const team1ScoreDisplay = document.getElementById("score-team1");
const team1WicketsDisplay = document.getElementById("wickets-team1");
const team2ScoreDisplay = document.getElementById("score-team2");
const team2WicketsDisplay = document.getElementById("wickets-team2");

// Initializing variables
let team1Score = 0;
let team1Wickets = 0;
let team2Score = 0;
let team2Wickets = 0;
let team1Balls = 0;
let team2Balls = 0;
let turn = 1;

// Possible outcomes of a ball
const possibleOutcomes = [0, 1, 2, 3, 4, 6, "W"];

// Function to handle end of game
function endGame() {
  let message = "";
  if (team1Score > team2Score) {
    message = "INDIA wins";
  } else if (team2Score > team1Score) {
    message = "PAKISTAN wins";
  } else {
    message = "It's another super over!";
  }
  alert(message);
}

// Function to update score displays
function updateScore() {
  team1ScoreDisplay.textContent = team1Score;
  team1WicketsDisplay.textContent = team1Wickets;
  team2ScoreDisplay.textContent = team2Score;
  team2WicketsDisplay.textContent = team2Wickets;
}

// Reset button click event
resetButton.addEventListener("click", () => {
  window.location.reload();
});


// Strike button click event
strikeButton.onclick = () => {
  const randomOutcome =
    possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];

  if (turn === 2) {
    team2Balls++;
    const team2BallDisplay = document.querySelector(
      `#team2-superover div:nth-child(${team2Balls})`
    );
    team2BallDisplay.textContent = randomOutcome;
    
    if (randomOutcome === "W") {
      team2Wickets++;
    } else {
      team2Score += randomOutcome;
    }

    if (team2Balls === 6 || team2Wickets === 2 || team2Score > team1Score) {
      turn = 3;
      endGame();
    }
  }

  if (turn === 1) {
    team1Balls++;
    const team1BallDisplay = document.querySelector(
      `#team1-superover div:nth-child(${team1Balls})`
    );
    team1BallDisplay.textContent = randomOutcome;

    if (randomOutcome === "W") {
      team1Wickets++;
    } else {
      team1Score += randomOutcome;
    }

    if (team1Balls === 6 || team1Wickets === 2) {
      turn = 2;
    }
  }
  updateScore();
};
