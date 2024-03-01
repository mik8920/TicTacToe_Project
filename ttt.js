const boardContainer = document.querySelector(".board-container");
const cells = document.querySelectorAll(".cell");
const resultDisplay = document.querySelector(".resultDisplay");
const startBtn = document.querySelector(".startBtn");
const form = document.getElementById("formContainer");
const submitBtn = document.querySelector(".submit");
let namesDisplay1 = document.querySelector(".displayNames1");
let namesDisplay2 = document.querySelector(".displayNames2");
const playerName1 = document.getElementById("player1");
const playerName2 = document.getElementById("player2");
const formContainer = document.querySelector(".formContainer")

const Gameboard = (() => {
  const createCells = () => {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        gameController.playMove(index);
      });
    });
  };

  const disableCell = (index) => {
    cells[index].removeEventListener("click", () => {
      gameController.playMove(index);
    });
  };

  const resetCell = () => {
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.addEventListener("click", Gameboard);
    });
  };

  return { createCells, disableCell, cells, resetCell };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

const gameController = (() => {
  let currentPlayer;
  let player1;
  let player2;
  let gameboard;
  let moves = 0;
  let gameOver = false;

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  const newGame = (index) => {
    resultDisplay.textContent = "";
    gameOver = false;
    const cells = gameboard.cells;
    gameboard.resetCell(index);
  };

  const startGame = () => {
    player1 = Player(playerName1.value, "X");
    player2 = Player(playerName2.value, "O");
    currentPlayer = player1;
    moves = 0;
    gameOver = false;

    startBtn.addEventListener("click", () => {
      startGame();
      cells.forEach((cell) => {
        newGame();
        cell.classList.remove("pointer-events-none");
      });
      formContainer.style.display = "block";
      playerName1.value = "";
      playerName2.value = "";
      namesDisplay1.style.display = "none";
      namesDisplay2.style.display = "none";
    });

    const setValidationError = (playerName1, playerName2) => {
      if (playerName1.value === "" || playerName2.value === "") {
        playerName1.setCustomValidity("Please enter both player names.");
        playerName2.setCustomValidity("Please enter both player names.");
      }
    };

    const formIsValid = (playerName1, playerName2) => {
      if (playerName1.value === "" || playerName2.value === "") {
        return false;
      }
      return true;
    };

    submitBtn.addEventListener("click", (event) => {
      if (!formIsValid(playerName1, playerName2)) {
        setValidationError(playerName1, playerName2);
        return;
      }
      event.preventDefault();
      if (submitBtn === false) {
        gameboard.disableCell(index);
      } else if (submitBtn === true) {
        formContainer.style.display = "none";
        namesDisplay1.textContent = playerName1.value;
        namesDisplay2.textContent = playerName2.value;
      }
      startGame();
    });

    gameboard = Gameboard;
    gameboard.createCells();
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const playMove = (index) => {
    const cells = gameboard.cells;
    if (!gameOver && !cells[index].textContent) {
      cells[index].textContent = currentPlayer.symbol;
      moves++;
      gameboard.disableCell(index);
      winCheck();
      if (!gameOver) {
        switchPlayer();
      }
    }
  };

  const winCheck = () => {
    const cells = gameboard.cells;
    for (let i = 0; i < 8; i++) {
      const condition = winConditions[i];
      const [a, b, c] = condition;
      if (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      ) {
        resultDisplay.textContent = `${currentPlayer.name.value} is the winner!`;
        gameOver = true;
        return;
      }
    }
    if (moves === 9) {
      resultDisplay.textContent = "It's a tie!";
      gameOver = true;
    }
  };
  return { startGame, playMove, winCheck };
})();

gameController.startGame();

//όταν παίζεις χαλάει η css στο formContainer
//όταν πατάς το submit δεν εξαφανίζεται η φόρμα όπως πριν
//όταν πατάς το newGame (startBtn)
//δεν εμφανίζονται τα ονόματα των παιχτών
