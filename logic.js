let score, roundScore, setScore, activePlayer, gamePlaying;

//-----------DOM------------------
const dice1 = document.querySelector("#dice-1");
const dice2 = document.querySelector("#dice-2");
const scoreInput = document.querySelector(".final-score");
const hint = document.querySelector(".hint");
const player1RoundScore = document.querySelector("#current-0");
const player2RoundScore = document.querySelector("#current-1");
const player1GlobalScore = document.querySelector("#score-0");
const player2GlobalScore = document.querySelector("#score-1");

const player1panel = document.querySelector('.player-0-panel');
const player2panel = document.querySelector('.player-1-panel');
//--------------------------------

init();

//------------Functions--------------
function init() {

  gamePlaying = true;

  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  setScore = Number(scoreInput.value);

  if (!setScore) {
    setScore = 100;
  }

  player1GlobalScore.textContent = "0";
  player2GlobalScore.textContent = "0";
  player1RoundScore.textContent = "0";
  player2RoundScore.textContent = "0";
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  setDisplayRule("none");

  if (!player1panel.classList.contains('active')) {
    player1panel.classList.add('active')
  }

  if (player2panel.classList.contains('active')) {
    player2panel.classList.remove('active')
  }

  if (player1panel.classList.contains('winner')) {
    player1panel.classList.remove('winner')
  }

  if (player2panel.classList.contains('winner')) {
    player2panel.classList.remove('winner')
  }
};

function holdScore() {
  if (gamePlaying) {

    if (roundScore === 0) return;

    const currentScore = Number(document.querySelector(`#current-${activePlayer}`).textContent);
    score[activePlayer] += currentScore;

    document.querySelector(`#score-${activePlayer}`).textContent = score[activePlayer];

    if (score[activePlayer] >= setScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      setDisplayRule("none");

      gamePlaying = false;
    } else {
      changePlayer();
    }
  }
}

function castDices() {
  if (gamePlaying) {
    const firstDiceNumber = getRandom();
    const secondDiceNumber = getRandom();

    dice1.src = `./images/dice-${firstDiceNumber}.png`;
    dice2.src = `./images/dice-${secondDiceNumber}.png`;

    if (checkDisplayRule("none")) {
      setDisplayRule("block");
    }

    if (firstDiceNumber === 1 || secondDiceNumber === 1) {
      changePlayer();
      return;
    }

    roundScore += (firstDiceNumber + secondDiceNumber);

    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
  }
}

function changePlayer() {

  roundScore = 0;

  document.querySelector(`#current-${activePlayer}`).textContent = "0";

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  player1panel.classList.toggle('active');
  player2panel.classList.toggle('active');
}

function getRandom() {
  return Math.floor(Math.random() * 6) + 1;
}

function checkDisplayRule(value) {
  if (dice1.style.display === value) {
    return true;
  } else {
    return false;
  }
}

function setDisplayRule(value) {
  dice1.style.display = value;
  dice2.style.display = value;
}

//-----------EventListeners------------------
document.querySelector(".btn-new").addEventListener("click", init);
document.querySelector(".btn-rules").addEventListener("click", function() {
  hint.classList.toggle('hint-show');
});
document.querySelector(".btn-roll").addEventListener("click", castDices);
document.querySelector(".btn-hold").addEventListener("click", holdScore);
scoreInput.addEventListener("input", init);
hint.addEventListener("click", function() {
  this.classList.remove("hint-show");
});