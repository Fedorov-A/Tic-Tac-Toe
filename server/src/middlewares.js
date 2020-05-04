const cookie = require('cookie');
const router = require('express').Router();
const path = require('path');
const users = require('./users');

function authentication(req, res, next) {
  if (req.headers.cookie) {
    req.userCredentials = users.sessions
      .find((el) => el.uuid === cookie.parse(req.headers.cookie).Session);
  }
  next();
}

function authorization(req, res, next) {
  if (req.userCredentials) {
    next();
  } else {
    res.sendStatus(401);
  }
}

router.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve('./client/src/index.html'));
});

router.post('/signIn', (req, res) => {
  const response = users.signIn(req.body.username, req.body.password);
  res.status(response.status).send(response.message);
});

router.post('/logIn', (req, res) => {
  const response = users.logIn(req.body.username, req.body.password);
  res.cookie('Session', response.cookie);
  res.status(response.status).send(response.message);
});

router.get('/createNewGame', authorization, (req, res) => {
  const response = users.createNewGame();
  res.status(response.status).send(response.message);
});

router.get('/getGames', authorization, (req, res) => {
  const response = users.getGames();
  res.status(response.status).send(response.games);
});

router.post('/connectToGame', authorization, (req, res) => {
  const response = users.connectToGame(req.body.gameUuid, cookie.parse(req.headers.cookie).Session);
  res.status(response.status).send(response.message);
});

router.post('/getGameStatus', authorization, (req, res) => {
  const response = users.getGameStatus(req.body.gameUuid);
  res.status(response.status).send(response.message);
});

router.post('/makeStep', authorization, (req, res) => {
  const response = users.makeStep(cookie.parse(req.headers.cookie).Session, req.body.x, req.body.y);
  res.status(response.status).send(response.message);
});

module.exports = {
  router,
  authentication,
  authorization,
};
