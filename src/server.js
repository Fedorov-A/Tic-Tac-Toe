const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const routes = require('./routes');
const users = require('./lib/users');
const logger = require('./lib/logger');

app.use(express.static(`${__dirname}/client`));
app.use(express.json());
app.use(cors());
app.use(cookie());
app.use(users.authentication);
app.use(routes);

io.on('connection', (socket) => {
  logger.log('a user connected');
  socket.on('user-logged-in', (sessionId) => logger.log(`user logged in (sessionId: ${sessionId})`));
  socket.on('disconnect', () => { logger.log('user disconnected'); });
});

module.exports = http;
