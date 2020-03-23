// Tic-Tac-Toe class
function TicTacToe() {
  this.table = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
  this.x = 0;
  this.y = 0;
  this.currentNumberOfSteps = 0;
  this.currentPlayer = 1;
}

// Gets table
TicTacToe.prototype.getTable = function getTable() {
  return this.table;
};

// Sets table
TicTacToe.prototype.setTable = function setTable(table) {
  this.resetGame();
  this.table = table;
  // Calculation number of steps
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (this.table[i][j] !== '.') {
        this.currentNumberOfSteps += 1;
      }
    }
  }
  return 'OK';
};

// Sets a cell for the next step
TicTacToe.prototype.setCell = function setCell(x, y) {
  this.x = x;
  this.y = y;
  return 'OK';
};

// Makes a step within choosen cell
TicTacToe.prototype.makeStep = function makeStep() {
  if (this.table[this.x][this.y] !== '.') {
    return 'Cell is not empty';
  }
  if (this.currentPlayer === 1) {
    this.table[this.x][this.y] = 'X';
    this.currentNumberOfSteps += 1;
    this.currentPlayer = 2;
  } else if (this.currentPlayer === 2) {
    this.table[this.x][this.y] = 'O';
    this.currentNumberOfSteps += 1;
    this.currentPlayer = 1;
  }
  return this.table;
};

// Resets the game
TicTacToe.prototype.resetGame = function resetGame() {
  this.table = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
  this.x = 0;
  this.y = 0;
  this.currentNumberOfSteps = 0;
  this.currentPlayer = 1;
};

TicTacToe.prototype.checkWinner = function checkWinner() {
  if ((this.table[0][0] === this.table[1][1] && this.table[1][1] === this.table[2][2] && this.table[2][2] === 'X')
    || (this.table[0][2] === this.table[1][1] && this.table[1][1] === this.table[2][0] && this.table[2][0] === 'X')) {
    return 'Player 1 has won';
  }
  for (let i = 0; i < 3; i += 1) {
    if ((this.table[i][0] === this.table[i][1] && this.table[i][1] === this.table[i][2] && this.table[i][2] === 'X')
      || (this.table[0][i] === this.table[1][i] && this.table[1][i] === this.table[2][i] && this.table[2][i] === 'X')) {
      return 'Player 1 has won';
    }
  }

  if ((this.table[0][0] === this.table[1][1] && this.table[1][1] === this.table[2][2] && this.table[2][2] === 'O')
    || (this.table[0][2] === this.table[1][1] && this.table[1][1] === this.table[2][0] && this.table[2][0] === 'O')) {
    return 'Player 2 has won';
  }
  for (let i = 0; i < 3; i += 1) {
    if ((this.table[i][0] === this.table[i][1] && this.table[i][1] === this.table[i][2] && this.table[i][2] === 'O')
      || (this.table[0][i] === this.table[1][i] && this.table[1][i] === this.table[2][i] && this.table[2][i] === 'O')) {
      return 'Player 2 has won';
    }
  }

  if (this.currentNumberOfSteps === 9) {
    return 'There is no winner';
  }

  return '';
};

module.exports = TicTacToe;
