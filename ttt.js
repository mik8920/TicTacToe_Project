const boardContainer = document.querySelector(".board-container");
const cells = document.querySelectorAll(".cell");
let namesDisplay1 = document.querySelector(".displayNames1");
let namesDisplay2 = document.querySelector(".displayNames2");
const resultDisplay = document.querySelector(".resultDisplay");
const startBtn = document.querySelector(".startBtn");
const form = document.getElementById("formContainer");
const submitBtn = document.querySelector(".submit");
const playerName1 = document.getElementById("player1");
const playerName2 = document.getElementById("player2");
const formContainer = document.querySelector(".formContainer");

const Gameboard = (() => {
  const addCellEventListener = () => {
    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        // Extract the index of the cell from its id e.g. 0 from cell-0
        cellIndex = e.target.id.split("-")[1];
        gameController.playMove(cellIndex);
      });
    });
  };

  const enableCells = () => {
    cells.forEach((cell) => {
      cell.classList.remove("pointer-events-none");
    });
  };

  const disableCells = () => {
    cells.forEach((cell) => {
      cell.classList.add("pointer-events-none");
    });
  };

  const disableCell = (cellIndex) => {
    cells[cellIndex].classList.add("pointer-events-none");
  };

  const resetCells = () => {
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  };

  return {
    addCellEventListener,
    disableCell,
    resetCells,
    enableCells,
    disableCells,
  };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

const gameController = (function () {
  let player1 = Player("playerName1.value", "X");
  let player2 = Player("playerName2.value", "O");
  let currentPlayer = player1;
  let isFirstGame = true;
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

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const resetGameVar = () => {
    moves = 0;
    currentPlayer = player1;
    gameOver = false;
  };

  const playMove = (cellIndex) => {
    console.log(currentPlayer);
    if (!gameOver) {
      cells[cellIndex].textContent = currentPlayer.symbol;
      moves++;
      Gameboard.disableCell(cellIndex);
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

  return { playMove, isFirstGame, resetGameVar };
})();

const restartGame = () => {
  resultDisplay.textContent = "";
  Gameboard.disableCells();
  gameController.resetGameVar();
  Gameboard.resetCells();
  resetForm();
};

startBtn.addEventListener("click", () => {
  if (
    !gameController.isFirstGame ||
    gameController.gameOver ||
    gameController.moves > 0
  ) {
    restartGame();
  } else {
    Gameboard.addCellEventListener();
    gameController.isFirstGame = false;
  }
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
  submitForm();
}
submitBtn.addEventListener("click", submitButtonClickListener);

const resetForm = () => {
  formContainer.style.display = "block";
  playerName1.value = "";
  playerName2.value = "";
  namesDisplay1.style.display = "block";
  namesDisplay2.style.display = "block";
};

const submitForm = () => {
  if (!gameController.isFirstGame) {
    restartGame();
  } else {
    Gameboard.addCellEventListener();
    gameController.isFirstGame = false;
  }
  Gameboard.enableCells();
  namesDisplay1.textContent = playerName1.value;
  namesDisplay2.textContent = playerName2.value;
  formContainer.style.display = "none";
};
