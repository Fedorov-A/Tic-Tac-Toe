const { When, Then } = require('cucumber');
const assert = require('assert');
const request = require('supertest');

const app = require('../src/server');

let actualResponse;
let sessionUuid;
let gameUuid;
let actualGameStatus;
let actualWinner;

When('user tries to sign in with followed username {string} and password {string}', (username, password) => request(app)
  .post('/signIn')
  .send({ username, password })
  .then((res) => { actualResponse = res.status; }));

When('user tries to log in with followed username {string} and password {string}', (username, password) => request(app)
  .post('/logIn')
  .send({ username, password })
  .then((res) => { actualResponse = res.status; sessionUuid = res.text; }));

When('user tries to create a new game', () => request(app)
  .get('/createNewGame')
  .set('Authorization', sessionUuid)
  .send()
  .then((res) => { actualResponse = res.status; gameUuid = res.text; }));

When('user tries to get a list of games', () => request(app)
  .get('/getGames')
  .set('Authorization', sessionUuid)
  .send()
  .then((res) => { actualResponse = res.status; }));

When('user tries to connect to that new game', () => request(app)
  .post('/connectToGame')
  .set('Authorization', sessionUuid)
  .send({ gameUuid })
  .then((res) => { actualResponse = res.status; }));

When('user tries to get game status', () => request(app)
  .post('/getGameStatus')
  .set('Authorization', sessionUuid)
  .send({ gameUuid })
  .then((res) => { actualResponse = res.status; actualGameStatus = res.body; }));

When('user tries to make a step [{int}, {int}]', (x, y) => request(app)
  .post('/makeStep')
  .set('Authorization', sessionUuid)
  .send({ x, y })
  .then((res) => { actualResponse = res.status; actualWinner = res.text; }));

Then('user gets response {int}', (expectedResponse) => {
  assert.equal(actualResponse, expectedResponse);
});

Then('user gets table [[{string},{string},{string}],[{string},{string},{string}],[{string},{string},{string}]]', (str1, str2, str3, str4, str5, str6, str7, str8, str9) => {
  const expectedGameStatus = [[str1, str2, str3], [str4, str5, str6], [str7, str8, str9]];
  assert.equal(actualGameStatus.toString(), expectedGameStatus.toString());
});

Then('show message {string}', (expectedWinner) => {
  assert.equal(actualWinner, expectedWinner);
});
