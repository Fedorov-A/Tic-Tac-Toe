const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  emptyCellSymbol: String,
  player1Symbol: String,
  player2Symbol: String,

  currentPlayerId: String,
  player1Id: String,
  player2Id: String,

  table: Array,
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
