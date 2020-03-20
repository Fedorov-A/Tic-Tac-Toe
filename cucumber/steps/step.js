const { Given, When, Then } = require('cucumber');
const { expect } = require('chai');
const TicTacToe = require('../../tictactoe.js');

let game;

Given('table', (dataTable) => {
  game = new TicTacToe();
  game.StartGame(dataTable.rawTable);
});

When('player 1 makes a step into cell {int}, {int}', (x, y) => {
  game.SetCell(x, y);
});

When('player 2 makes a step into cell {int}, {int}', (x, y) => {
  game.SetCell(x, y);
});

Then('table becomes', (dataTable) => {
  game.MakeStep();
  expect(game.table.toString()).to.equal(dataTable.rawTable.toString());
});

Then('throw error', () => {
  expect(game.MakeStep).to.throw(Error);
});

Then('show message {string}', (str) => {
  game.stepsNumber = 9;
  expect(game.CheckWinners()).to.equal(str);
});
