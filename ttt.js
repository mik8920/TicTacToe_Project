const boardContainer = document.querySelector(".board-container");
const cells = document.querySelectorAll(".cell");
const resultDisplay = document.querySelector(".resultDisplay");
const startBtn = document.querySelector(".startBtn");

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

  return { createCells, disableCell, cells };
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

  const startGame = () => {
    player1 = Player("Mik", "X");
    player2 = Player("Helen", "O");
    currentPlayer = player1;
    moves = 0;
    gameOver = false;

    const newGame = (index) => {
      resultDisplay.textContent = "";
      gameOver = false;
      const cells = gameboard.cells;
      cells[index].textContent = "";
    };

    startBtn.addEventListener("click", () => {
      startGame();
      cells.forEach((cell) => {
        newGame();
        cell.classList.remove("pointer-events-none");
      });
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
        resultDisplay.textContent = `${currentPlayer.name} is the winner!`;
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

//restart button
//form names
