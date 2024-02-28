/* 
1. You’re going to store the gameboard as an array inside of a Gameboard object. 
2. Your players are also going to be stored in objects.
3. You’re probably going to want an object to control the flow of the game itself. 
*/

/* 
1. Make a gameboard object. DONE
2. Store the gameboard as an array inside. DONE
3. Store your players in objects. DONE
4. Create an object to control the flow of the game. DONE
*/

const Gameboard = (() => {
  const boardContainer = document.querySelector(".board");
  const cells = document.querySelectorAll(".cell");

  const createCells = () => {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        // Handle cell click event
        gameController.playMove(index);
      });
    });
  };

  return { createCells };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

const gameController = (() => {
  let currentPlayer;
  let player1;
  let player2;
  let gameboard;

  const WINNING_COMBINATIONS = [
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
    player1 = Player("Player 1", "X");
    player2 = Player("Player 2", "O");
    currentPlayer = player1;

    gameboard = Gameboard;
    gameboard.createCells();
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const playMove = (index) => {
    // Logic for playing a move
    console.log(`Player ${currentPlayer.symbol} clicked cell ${index}`);
    switchPlayer();
  };

  return { startGame, playMove };
})();

gameController.startGame();

/* const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]; */
