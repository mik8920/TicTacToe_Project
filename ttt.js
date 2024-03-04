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
const formContainer = document.querySelector(".formContainer");

const Gameboard = (() => {
  const createCells = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        // Extract the index of the cell from its id e.g. 0 from cell-0
        cellIndex = e.target.id.split("-")[1];
        gameController.playMove(cellIndex);
      });
    });
  };

  const disableCell = (cellIndex) => {
    cells[cellIndex].classList.add("pointer-events-none");
  };

  const resetCell = () => {
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  };

  const enableCells = () => {
    cells.forEach((cell) => {
      cell.classList.remove("pointer-events-none");
    });
  };

  return { createCells, disableCell, resetCell, enableCells };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

const gameController = (function () {
  let currentPlayer;
  let player1;
  let player2;
  let gameboard;
  let moves = 0;
  let gameOver = false;

  const winConditions = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  function restartGame() {
    resultDisplay.textContent = "";
    gameOver = false;
    gameboard.resetCell();
  }

  const startGame = () => {
    player1 = Player(playerName1.value, "X");
    player2 = Player(playerName2.value, "O");
    currentPlayer = player1;
    moves = 0;
    gameOver = false;

    startBtn.addEventListener("click", () => {
      if (!formIsValid(playerName1, playerName2)) {
        return;
      }
      startGame();
      cells.forEach((cell) => {
        restartGame();
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
    function submitButtonClickListener(event) {
      if (!formIsValid(playerName1, playerName2)) {
        setValidationError(playerName1, playerName2);
        return;
      }
      event.preventDefault();

      formContainer.style.display = "none";
      namesDisplay1.textContent = playerName1.value;
      namesDisplay2.textContent = playerName2.value;
      gameboard.enableCells();
      startGame();
    }
    submitBtn.addEventListener("click", submitButtonClickListener);

    
    Gameboard.createCells();
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer.name === player1.name ? player2 : player1;
  };

  const playMove = (cellIndex) => {
    console.log(currentPlayer)
    if (!gameOver ) {
      cells[cellIndex].textContent = currentPlayer.symbol;
      moves++;
      gameboard.disableCell(cellIndex);
      winCheck();
      switchPlayer();
    }
  };

  const winCheck = () => {
    for (let i = 1; i < cells.length; i++) {
      const condition = winConditions[i - 1];
      const [a, b, c] = condition;
      if (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      ) {
        resultDisplay.textContent = `${currentPlayer.name} is the winner!`;
        gameOver = true;
        cells.forEach((cell) => cell.classList.add("pointer-events-none"));
        return;
      }
    }
    if (moves === 9) {
      resultDisplay.textContent = "It's a tie!";
      gameOver = true;
      cells.forEach((cell) => cell.classList.add("pointer-events-none"));
    }
  };
  return { startGame, playMove, winCheck };
})();

gameController.startGame();
