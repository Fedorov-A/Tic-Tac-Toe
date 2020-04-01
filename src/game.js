// Tic-Tac-Toe class
function TicTacToe() {
  this.emptyCell = '';
  this.player1 = '1';
  this.player2 = '2';
  this.resetGame();
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

// Makes a step within choosen cell
TicTacToe.prototype.makeStep = function makeStep(x, y) {
  if (this.table[x][y] === this.emptyCell) {
    if (this.currentPlayer === 1) {
      this.table[x][y] = this.player1;
      this.currentNumberOfSteps += 1;
      this.currentPlayer = 2;
    } else if (this.currentPlayer === 2) {
      this.table[x][y] = this.player2;
      this.currentNumberOfSteps += 1;
      this.currentPlayer = 1;
    }
  }
  return 'OK';
};

TicTacToe.prototype.checkWinner = function checkWinner() {
  if ((this.table[0][0] === this.table[1][1]
    && this.table[1][1] === this.table[2][2]
    && this.table[2][2] === this.player1)
    || (this.table[0][2] === this.table[1][1]
      && this.table[1][1] === this.table[2][0]
      && this.table[2][0] === this.player1)) {
    return 'Player 1 has won';
  }
  for (let i = 0; i < 3; i += 1) {
    if ((this.table[i][0] === this.table[i][1]
      && this.table[i][1] === this.table[i][2]
      && this.table[i][2] === this.player1)
      || (this.table[0][i] === this.table[1][i]
        && this.table[1][i] === this.table[2][i]
        && this.table[2][i] === this.player1)) {
      return 'Player 1 has won';
    }
  }

  if ((this.table[0][0] === this.table[1][1]
    && this.table[1][1] === this.table[2][2]
    && this.table[2][2] === this.player2)
    || (this.table[0][2] === this.table[1][1]
      && this.table[1][1] === this.table[2][0]
      && this.table[2][0] === this.player2)) {
    return 'Player 2 has won';
  }
  for (let i = 0; i < 3; i += 1) {
    if ((this.table[i][0] === this.table[i][1]
      && this.table[i][1] === this.table[i][2]
      && this.table[i][2] === this.player2)
      || (this.table[0][i] === this.table[1][i]
        && this.table[1][i] === this.table[2][i]
        && this.table[2][i] === this.player2)) {
      return 'Player 2 has won';
    }
  }

  if (this.currentNumberOfSteps === 9) {
    return 'There is no winner';
  }

  return '';
};

// Resets the game
TicTacToe.prototype.resetGame = function resetGame() {
  this.table = [[this.emptyCell, this.emptyCell, this.emptyCell],
    [this.emptyCell, this.emptyCell, this.emptyCell],
    [this.emptyCell, this.emptyCell, this.emptyCell]];
  this.currentNumberOfSteps = 0;
  this.currentPlayer = 1;
};

module.exports = TicTacToe;
