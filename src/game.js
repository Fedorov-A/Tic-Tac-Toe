// Tic-Tac-Toe class
function TicTacToe() {
  this.emptyCell = '';
  this.firstPlayer = '1';
  this.secondPlayer = '2';
  this.x = 0;
  this.y = 0;
  this.currentNumberOfSteps = 0;
  this.currentPlayer = 1;
  this.table = [[this.emptyCell, this.emptyCell, this.emptyCell],
    [this.emptyCell, this.emptyCell, this.emptyCell],
    [this.emptyCell, this.emptyCell, this.emptyCell]];
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
      if (this.table[i][j] !== this.emptyCell) {
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
  if (this.table[this.x][this.y] !== this.emptyCell) {
    return 'Cell is not empty';
  }
  if (this.currentPlayer === 1) {
    this.table[this.x][this.y] = this.firstPlayer;
    this.currentNumberOfSteps += 1;
    this.currentPlayer = 2;
  } else if (this.currentPlayer === 2) {
    this.table[this.x][this.y] = this.secondPlayer;
    this.currentNumberOfSteps += 1;
    this.currentPlayer = 1;
  }
  return this.table;
};

// Resets the game
TicTacToe.prototype.resetGame = function resetGame() {
  this.table = [[this.emptyCell, this.emptyCell, this.emptyCell],
    [this.emptyCell, this.emptyCell, this.emptyCell],
    [this.emptyCell, this.emptyCell, this.emptyCell]];
  this.x = 0;
  this.y = 0;
  this.currentNumberOfSteps = 0;
  this.currentPlayer = 1;
};

TicTacToe.prototype.checkWinner = function checkWinner() {
  if ((this.table[0][0] === this.table[1][1]
    && this.table[1][1] === this.table[2][2]
    && this.table[2][2] === this.firstPlayer)
    || (this.table[0][2] === this.table[1][1]
      && this.table[1][1] === this.table[2][0]
      && this.table[2][0] === this.firstPlayer)) {
    return 'Player 1 has won';
  }
  for (let i = 0; i < 3; i += 1) {
    if ((this.table[i][0] === this.table[i][1]
      && this.table[i][1] === this.table[i][2]
      && this.table[i][2] === this.firstPlayer)
      || (this.table[0][i] === this.table[1][i]
        && this.table[1][i] === this.table[2][i]
        && this.table[2][i] === this.firstPlayer)) {
      return 'Player 1 has won';
    }
  }

  if ((this.table[0][0] === this.table[1][1]
    && this.table[1][1] === this.table[2][2]
    && this.table[2][2] === this.secondPlayer)
    || (this.table[0][2] === this.table[1][1]
      && this.table[1][1] === this.table[2][0]
      && this.table[2][0] === this.secondPlayer)) {
    return 'Player 2 has won';
  }
  for (let i = 0; i < 3; i += 1) {
    if ((this.table[i][0] === this.table[i][1]
      && this.table[i][1] === this.table[i][2]
      && this.table[i][2] === this.secondPlayer)
      || (this.table[0][i] === this.table[1][i]
        && this.table[1][i] === this.table[2][i]
        && this.table[2][i] === this.secondPlayer)) {
      return 'Player 2 has won';
    }
  }

  if (this.currentNumberOfSteps === 9) {
    return 'There is no winner';
  }

  return '';
};

module.exports = TicTacToe;
