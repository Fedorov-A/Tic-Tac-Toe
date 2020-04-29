const { MongoClient } = require('mongodb');
const assert = require('assert');
const logger = require('./lib/logger');

// Connection URL
const url = 'mongodb://localhost:27017';
const name = 'tic-tac-toe';

let db;

MongoClient.connect(`${url}`, (err, client) => {
  assert.equal(null, err);
  logger.log('Connected successfully to server');

  db = client.db(`${name}`);

  client.close();
});

module.exports = db;
