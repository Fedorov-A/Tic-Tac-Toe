const router = require('express').Router();
const TicTacToe = require('./game');

const game = new TicTacToe();

router.get('/getTable', (req, res) => {
  res.status(200).send(game.getTable());
});

router.post('/setTable', (req, res) => {
  game.setTable(req.body);
  res.status(200).send('OK');
});

router.post('/setCell', (req, res) => {
  game.setCell(req.body.x, req.body.y);
  res.status(200).send('OK');
});

router.post('/makeStep', (req, res) => {
  game.makeStep();
  res.status(200).send('OK');
});

module.exports = router;
