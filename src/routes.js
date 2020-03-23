const router = require('express').Router();
const TicTacToe = require('./game');

const game = new TicTacToe();

router.get('/getTable', (req, res) => {
  res.status(200).send(game.getTable());
});

router.post('/setTable', (req, res) => {
  res.status(200).send(game.setTable(req.body));
});

router.post('/makeStep', (req, res) => {
  res.status(200).send(game.makeStep(req.body.x, req.body.y));
});

router.get('/checkWinner', (req, res) => {
  res.status(200).send(game.checkWinner());
});

module.exports = router;
