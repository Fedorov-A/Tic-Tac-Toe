const router = require('express').Router();
const users = require('./lib/users');

router.get('/', (req, res) => {
  res.status(200).sendFile(`${__dirname}/client/index.html`);
});

router.post('/signIn', (req, res) => {
  const response = users.signIn(req.body.username, req.body.password);
  res.status(response.status).send(response.message);
});

router.post('/logIn', (req, res) => {
  const response = users.logIn(req.body.username, req.body.password);
  res.cookie('Session', response.message);
  res.status(response.status).send(response.message);
});

router.get('/createNewGame', users.authorization, (req, res) => {
  const response = users.createNewGame(req.headers.authorization);
  res.status(response.status).send(response.message);
});

router.get('/getGames', users.authorization, (req, res) => {
  const response = users.getGames();
  res.status(response.status).send(response.games);
});

router.post('/connectToGame', users.authorization, (req, res) => {
  const response = users.connectToGame(req.body.gameUuid, req.headers.authorization);
  res.status(response.status).send(response.message);
});

router.post('/getGameStatus', users.authorization, (req, res) => {
  const response = users.getGameStatus(req.body.gameUuid);
  res.status(response.status).send(response.message);
});

router.post('/makeStep', users.authorization, (req, res) => {
  const response = users.makeStep(req.headers.authorization, req.body.x, req.body.y);
  res.status(response.status).send(response.message);
});

module.exports = router;
