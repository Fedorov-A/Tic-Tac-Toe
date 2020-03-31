const router = require('express').Router();
const TicTacToe = require('./game');
const users = require('./lib/users');

const game = new TicTacToe();

router.get('/getTable', users.authorizationRequired, (req, res) => {
  res.status(200).send(game.getTable());
});

router.post('/setTable', users.authorizationRequired, (req, res) => {
  res.status(200).send(game.setTable(req.body));
});

router.post('/makeStep', users.authorizationRequired, (req, res) => {
  res.status(200).send(game.makeStep(req.body.x, req.body.y));
});

router.get('/checkWinner', users.authorizationRequired, (req, res) => {
  res.status(200).send(game.checkWinner());
});

router.post('/login', (req, res) => {
  res.status(200).send(users.checkLogin(req.body.login, req.body.password));
});

module.exports = router;
