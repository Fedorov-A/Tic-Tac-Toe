const input = require('readline-sync');
const TicTacToe = require('./tictactoe.js');

// Greeting
console.log('Welcome to Tic-Tac-Toe!\n');

const game = new TicTacToe();

while (true) {
  let x = 0;
  let y = 0;

  while (game.currentStep === 1) {
    console.log('Player 1 (Crosses) turn:');

    do {
      x = input.question('Enter x: ');
    }
    while (isNaN(x) || Math.round(x) !== Number(x) || x < 0 || x > 2);

    do {
      y = input.question('Enter y: ');
    }
    while (isNaN(y) || Math.round(y) !== Number(y) || y < 0 || y > 2);

    game.SetCell(x, y);
    try {
      game.MakeStep();
    } catch (error) {
      console.log(error.message);
      console.log();
    }
  }

  game.ShowTable();
  console.log(game.CheckWinners());
  if (game.CheckWinners() !== '') {
    break;
  }

  while (game.currentStep === 2) {
    console.log('Player 2 (Noughts) turn:');

    do {
      x = input.question('Enter x: ');
    }
    while (isNaN(x) || Math.round(x) !== Number(x) || x < 0 || x > 2);

    do {
      y = input.question('Enter y: ');
    }
    while (isNaN(y) || Math.round(y) !== Number(y) || y < 0 || y > 2);

    game.SetCell(x, y);
    try {
      game.MakeStep();
    } catch (error) {
      console.log(error.message);
      console.log();
    }
  }

  game.ShowTable();
  console.log(game.CheckWinners());
  console.log();

  if (game.CheckWinners() !== '') {
    break;
  }
}
