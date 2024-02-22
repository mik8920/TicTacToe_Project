/* 
1. You’re going to store the gameboard as an array inside of a Gameboard object. 
2. Your players are also going to be stored in objects.
3. You’re probably going to want an object to control the flow of the game itself. 
*/

/* 
1. Make a gameboard object.
2. Store the gameboard as an array inside.
3. Store your players in objects.
4. Create an object to control the flow of the game.
*/

const Gameboard = function () {
  const rows = 3;
  const columns = 3;
  const baord = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }
};

const getboard = () => board;

const Gameplay = function () {};
