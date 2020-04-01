const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const request = require('supertest');

const app = require('../src/server');

let actualResponse;
let sessionUuid;

When('user tries to sign in with followed {string} and {string}', (username, password) => request(app)
  .post('/signIn')
  .send({ username, password })
  .then((res) => { actualResponse = res.status; }));

When('user tries to log in with followed {string} and {string}', (username, password) => request(app)
  .post('/logIn')
  .send({ username, password })
  .then((res) => { actualResponse = res.status; sessionUuid = res.text; }));

When('user creates a new game', () => request(app)
  .post('/createNewGame')
  .set('Authorization', sessionUuid)
  .send()
  .then((res) => { actualResponse = res.status; }));

Then('user gets {int}', (expectedResponse) => {
  assert.equal(actualResponse, expectedResponse);
});

Then('table becomes', (dataTable) => request(app)
  .get('/getTable')
  .send()
  .expect(200, dataTable.rawTable));

Given('table', (dataTable) => request(app)
  .post('/setTable')
  .send(dataTable.rawTable)
  .expect(200, 'OK'));

When('player 1 makes a step into cell {int}, {int}', (x, y) => request(app)
  .post('/makeStep')
  .send({ x, y })
  .expect(200, 'OK'));

When('player 2 makes a step into cell {int}, {int}', (x, y) => request(app)
  .post('/makeStep')
  .send({ x, y })
  .expect(200, 'OK'));

Then('show message {string}', (str) => request(app)
  .get('/checkWinner')
  .expect(200, str));
