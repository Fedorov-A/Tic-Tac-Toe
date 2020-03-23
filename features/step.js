const { Given, When, Then } = require('cucumber');
const request = require('supertest');

const app = require('../src/server');

Given('table', (dataTable) => request(app)
  .post('/setTable')
  .send(dataTable.rawTable)
  .expect(200, 'OK'));

When('player 1 makes a step into cell {int}, {int}', (x, y) => request(app)
  .post('/setCell')
  .send({ x, y })
  .expect(200, 'OK'));

When('player 2 makes a step into cell {int}, {int}', (x, y) => request(app)
  .post('/setCell')
  .send({ x, y })
  .expect(200, 'OK'));

Then('table becomes', (dataTable) => request(app)
  .post('/makeStep')
  .send()
  .expect(200, dataTable.rawTable));

Then('throw error', () => request(app)
  .post('/makeStep')
  .send()
  .expect(200, 'Cell is not empty'));

Then('show message {string}', (str) => request(app)
  .get('/checkWinner')
  .expect(200, str));
