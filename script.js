const playerOneContainer = document.querySelector(".player-one");
const playerTwoContainer = document.querySelector(".player-two");
const playerOneCurrent = document.querySelector(".player-one-current");
const playerTwoCurrent = document.querySelector(".player-two-current");
const diceContainer = document.querySelector(".dice-img-container");
const playerOneResult = document.querySelector(".player-one-result");
const playerTwoResult = document.querySelector(".player-two-result");
const restBtn = document.querySelector("#restBtn");
const rollDiceBtn = document.querySelector("#rollDiceBtn");
const holdScore = document.querySelector("#holdScore");

let currentPlayer = 1;
let currentScoreOne = { value: 0 };
let currentScoreTwo = { value: 0 };
let playerOneTotalScore = { value: 0 };
let playerTwoTotalScore = { value: 0 };
let playing = true;

const generateRandom = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

const displayDice = function (randomNumber) {
  diceContainer.innerHTML = "";
  const diceImg = document.createElement("img");
  diceImg.src = `./imgs/dice-${randomNumber}.png`;
  diceImg.alt = "dice";

  diceContainer.appendChild(diceImg);
};

const activatePlayer = function (active, disActive, nextPlayer = null) {
  currentPlayer = nextPlayer ?? (currentPlayer === 1 ? 2 : 1);
  active.classList.add("active");
  disActive.classList.remove("active");
};

const upTotalScore = function (playerTotalScore, currentScore, playerResult) {
  playerTotalScore.value += currentScore.value;
  playerResult.textContent = playerTotalScore.value;
};
const reSetCurrentScore = function (currentScore, playerCurrent) {
  currentScore.value = 0;
  playerCurrent.textContent = currentScore.value;
};

const addWinner = function (player) {
  playing = false;
  player.classList.add("winner");
  diceContainer.innerHTML = "";
};

rollDiceBtn.addEventListener("click", function () {
  if (playing) {
    let randomNumber = generateRandom();
    displayDice(randomNumber);

    if (currentPlayer === 1) {
      if (randomNumber !== 1) {
        currentScoreOne.value += randomNumber;
        playerOneCurrent.textContent = currentScoreOne.value;
      } else {
        reSetCurrentScore(currentScoreOne, playerOneCurrent);
        activatePlayer(playerTwoContainer, playerOneContainer);
      }
    } else if (currentPlayer === 2) {
      if (randomNumber !== 1) {
        currentScoreTwo.value += randomNumber;
        playerTwoCurrent.textContent = currentScoreTwo.value;
      } else {
        reSetCurrentScore(currentScoreTwo, playerTwoCurrent);
        activatePlayer(playerOneContainer, playerTwoContainer);
      }
    }
  }
});

holdScore.addEventListener("click", function () {
  if (playing) {
    if (currentPlayer === 1) {
      upTotalScore(playerOneTotalScore, currentScoreOne, playerOneResult);
      reSetCurrentScore(currentScoreOne, playerOneCurrent);
      if (playerOneTotalScore.value >= 100) {
        addWinner(playerOneContainer);
      } else {
        activatePlayer(playerTwoContainer, playerOneContainer);
      }
    } else if (currentPlayer === 2) {
      upTotalScore(playerTwoTotalScore, currentScoreTwo, playerTwoResult);
      reSetCurrentScore(currentScoreTwo, playerTwoCurrent);
      if (playerTwoTotalScore.value >= 100) {
        addWinner(playerTwoContainer);
      } else {
        activatePlayer(playerOneContainer, playerTwoContainer);
      }
    }
  }
});

restBtn.addEventListener("click", function () {
  reSetCurrentScore(currentScoreOne, playerOneCurrent);
  reSetCurrentScore(currentScoreTwo, playerTwoCurrent);

  playerOneTotalScore.value = 0;
  playerOneResult.textContent = playerOneTotalScore.value;

  playerTwoTotalScore.value = 0;
  playerTwoResult.textContent = playerTwoTotalScore.value;

  diceContainer.innerHTML = "";

  activatePlayer(playerOneContainer, playerTwoContainer, 1);

  playerOneContainer.classList.remove("winner");
  playerTwoContainer.classList.remove("winner");
  playing = true;
});
