const hitBallBtn = document.querySelector("#hit");
const newGameBtn = document.querySelector("#new-game");
const team1RunsEl = document.querySelector("#runs-team1");
const team1FallsEl = document.querySelector("#falls-team1");
const team2RunsEl = document.querySelector("#runs-team2");
const team2FallsEl = document.querySelector("#falls-team2");

let team1Runs = 0, team1Falls = 0, team2Runs = 0, team2Falls = 0;
let team1Deliveries = 0, team2Deliveries = 0;
let currentInnings = 1;

const possibleResults = [0, 1, 2, 3, 4, 6, "Out"];

function concludeMatch() {
  let resultMessage = "";
  if (team1Runs > team2Runs) {
    resultMessage = "Team 1 emerges victorious!";
  } else if (team2Runs > team1Runs) {
    resultMessage = "Team 2 claims the win!";
  } else {
    resultMessage = "It's a tie! Prepare for another intense over!";
  }
  window.alert(resultMessage);
}

function refreshScoreboard() {
  team1RunsEl.textContent = team1Runs;
  team1FallsEl.textContent = team1Falls;
  team2RunsEl.textContent = team2Runs;
  team2FallsEl.textContent = team2Falls;
}

newGameBtn.addEventListener("click", () => {
  location.reload();
});

hitBallBtn.addEventListener("click", () => {
  const outcome = possibleResults[Math.floor(Math.random() * possibleResults.length)];
  
  if (currentInnings === 2) {
    team2Deliveries++;
    document.querySelector(`#team2-over div:nth-child(${team2Deliveries})`).textContent = outcome;
    
    if (outcome === "Out") {
      team2Falls++;
    } else {
      team2Runs += outcome;
    }
    
    if (team2Deliveries === 6 || team2Falls === 2 || team2Runs > team1Runs) {
      currentInnings = 3;
      concludeMatch();
    }
  }
  
  if (currentInnings === 1) {
    team1Deliveries++;
    document.querySelector(`#team1-over div:nth-child(${team1Deliveries})`).textContent = outcome;
    
    if (outcome === "Out") {
      team1Falls++;
    } else {
      team1Runs += outcome;
    }
    
    if (team1Deliveries === 6 || team1Falls === 2) {
      currentInnings = 2;
    }
  }
  
  refreshScoreboard();
});
