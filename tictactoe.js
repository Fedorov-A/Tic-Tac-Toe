// Tic-Tac-Toe class
function TicTacToe() {
  this.table = [['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
  this.x = 1;
  this.y = 1;
  this.currentStep = 1;
}

// Starts game within provided table
TicTacToe.prototype.StartGame = function (table) {
  this.table = table;
};

// Sets a cell for the next step
TicTacToe.prototype.SetCell = function (x, y) {
  this.x = x;
  this.y = y;
};

// Makes a step
TicTacToe.prototype.MakeStep = function () {
  if (this.table[this.x][this.y] !== '.') {
    throw Error('Cell is not empty');
  }
  if (this.currentStep === 1) {
    this.table[this.x][this.y] = 'X';
    this.currentStep = 2;
  } else if (this.currentStep === 2) {
    this.table[this.x][this.y] = 'O';
    this.currentStep = 1;
  }
};

TicTacToe.prototype.CheckWinners = function () {
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

  return 'There is no winner (yet)';
};

module.exports = TicTacToe;
