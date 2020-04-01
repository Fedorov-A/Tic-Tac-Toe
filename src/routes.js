const router = require('express').Router();
const TicTacToe = require('./game');
const users = require('./lib/users');

const game = new TicTacToe();

router.post('/signIn', (req, res) => {
  const response = users.signIn(req.body.username, req.body.password);
  res.status(response.status).send(response.message);
});

router.post('/logIn', (req, res) => {
  const response = users.logIn(req.body.username, req.body.password);
  res.status(response.status).send(response.message);
});

router.post('/createNewGame', users.authorization, (req, res) => {
  users.createNewGame(req.headers.authorization);
  res.status(200).send();
});

router.get('/getTable', users.authorization, (req, res) => {
  res.status(200).send(game.getTable());
});

router.post('/setTable', users.authorization, (req, res) => {
  res.status(200).send(game.setTable(req.body));
});

router.post('/makeStep', users.authorization, (req, res) => {
  res.status(200).send(game.makeStep(req.body.x, req.body.y));
});

router.get('/checkWinner', users.authorization, (req, res) => {
  res.status(200).send(game.checkWinner());
});


module.exports = router;
