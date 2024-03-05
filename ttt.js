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

  /*     const enableCell = () => {
    cells.forEach((cell) => {
      cell.classList.remove("pointer-events-none");
      console.log("cells are enabled");
    });
  }; */

  const disableCell = (cellIndex) => {
    cells[cellIndex].classList.add("pointer-events-none");
  };

  const resetCells = () => {
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  };

  return { addCellEventListener, /* enableCell */ disableCell, resetCells };
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

  const resetMoveCount = () => {
    moves = 0
  }

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

  return { playMove, isFirstGame,resetMoveCount };
})();

const restartGame = () => {
  resultDisplay.textContent = "";
  gameOver = false;
  gameController.resetMoveCount()
  Gameboard.resetCells();
};

/*   formContainer.style.display = "block";
  playerName1.value = "";
  playerName2.value = "";
  namesDisplay1.style.display = "none";
  namesDisplay2.style.display = "none";
}; */

startBtn.addEventListener("click", () => {
  if (!gameController.isFirstGame) {
  restartGame();
}else{
  Gameboard.addCellEventListener();
  gameController.isFirstGame = false
}
  cells.forEach((cell) => {
    cell.classList.remove("pointer-events-none");
  });
});

/* const setValidationError = (playerName1, playerName2) => {
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
}; */
