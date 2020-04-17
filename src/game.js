const uuid = require('uuid');

function TicTacToe() {
  // empty cell symbol
  this.emptyCell = '';
  // player 1 symbol
  this.player1 = '1';
  // player 2 symbol
  this.player2 = '2';
  this.player1Uuid = '';
  this.player2Uuid = '';
  this.player1Username = '';
  this.player2Username = '';
  this.uuid = uuid.v4();
  this.currentPlayer = this.player1Uuid;
  this.gameHasFinished = false;
  this.resetGame();
}

TicTacToe.prototype.setPlayer1 = function setPlayer1(playerUuid, username) {
  this.player1Uuid = playerUuid;
  this.player1Username = username;
  if (this.currentPlayer === '') {
    this.currentPlayer = this.player1Uuid;
  }
};

TicTacToe.prototype.setPlayer2 = function setPlayer2(playerUuid, username) {
  this.player2Uuid = playerUuid;
  this.player2Username = username;
  if (this.currentPlayer === '') {
    this.currentPlayer = this.player2Uuid;
  }
};

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
  if (this.currentPlayer === this.player1Uuid) {
    this.table[x][y] = this.player1;
    this.currentNumberOfSteps += 1;
    this.currentPlayer = this.player2Uuid;
  } else if (this.currentPlayer === this.player2Uuid) {
    this.table[x][y] = this.player2;
    this.currentNumberOfSteps += 1;
    this.currentPlayer = this.player1Uuid;
  }

  return this.checkWinner();
};

TicTacToe.prototype.userCanMakeStep = function userCanMakeStep(userUuid, x, y) {
  if (this.gameHasFinished) {
    return `Game over. ${this.checkWinner()}`;
  }

  if (this.currentPlayer !== userUuid) {
    return 'It\'s not your turn.';
  }

  if (this.table[x][y] !== this.emptyCell) {
    return 'Cell is not empty.';
  }

  return '';
};

TicTacToe.prototype.checkWinner = function checkWinner() {
  if ((this.table[0][0] === this.table[1][1]
    && this.table[1][1] === this.table[2][2]
    && this.table[2][2] === this.player1)
    || (this.table[0][2] === this.table[1][1]
      && this.table[1][1] === this.table[2][0]
      && this.table[2][0] === this.player1)) {
    this.gameHasFinished = true;
    return `Player 1 (${this.player1Username}) has won.`;
  }
  for (let i = 0; i < 3; i += 1) {
    if ((this.table[i][0] === this.table[i][1]
      && this.table[i][1] === this.table[i][2]
      && this.table[i][2] === this.player1)
      || (this.table[0][i] === this.table[1][i]
        && this.table[1][i] === this.table[2][i]
        && this.table[2][i] === this.player1)) {
      this.gameHasFinished = true;
      return `Player 1 (${this.player1Username}) has won.`;
    }
  }

  if ((this.table[0][0] === this.table[1][1]
    && this.table[1][1] === this.table[2][2]
    && this.table[2][2] === this.player2)
    || (this.table[0][2] === this.table[1][1]
      && this.table[1][1] === this.table[2][0]
      && this.table[2][0] === this.player2)) {
    this.gameHasFinished = true;
    return `Player 2 (${this.player2Username}) has won.`;
  }
  for (let i = 0; i < 3; i += 1) {
    if ((this.table[i][0] === this.table[i][1]
      && this.table[i][1] === this.table[i][2]
      && this.table[i][2] === this.player2)
      || (this.table[0][i] === this.table[1][i]
        && this.table[1][i] === this.table[2][i]
        && this.table[2][i] === this.player2)) {
      this.gameHasFinished = true;
      return `Player 2(${this.player2Username}) has won.`;
    }
  }

  if (this.currentNumberOfSteps === 9) {
    this.gameHasFinished = true;
    return 'There is no winner.';
  }

  return 'OK';
};

// Resets the game
TicTacToe.prototype.resetGame = function resetGame() {
  this.table = [[this.emptyCell, this.emptyCell, this.emptyCell],
    [this.emptyCell, this.emptyCell, this.emptyCell],
    [this.emptyCell, this.emptyCell, this.emptyCell]];
  this.currentNumberOfSteps = 0;
  this.currentPlayer = this.player1Uuid;
};

module.exports = TicTacToe;
