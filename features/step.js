const { Given, When, Then } = require('cucumber');
const request = require('supertest');
const { expect } = require('chai');

const app = require('../src/server');

Given('table', (dataTable) => {
  request(app).post('/setTable').send(dataTable);
});

When('player 1 makes a step into cell {int}, {int}', (x, y) => {
  request(app).post('/setCell').send({ x, y });
});

When('player 2 makes a step into cell {int}, {int}', (x, y) => {
  request(app).post('/setCell').send({ x, y });
});

Then('table becomes', (dataTable) => {
  request(app).post('/makeStep').send().then();
  const table = request(app).get('/getTable').body;
  expect(table.toString()).to.equal(dataTable.rawTable.toString());
});

Then('throw error', async () => {
  //
});

Then('show message {string}', (str) => {
  // game.currentNumberOfSteps = 9;
  // expect(game.checkWinner()).to.equal(str);
});
