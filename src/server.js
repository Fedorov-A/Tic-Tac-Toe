const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { router, authentication } = require('./middlewares');
const logger = require('./lib/logger');

app.use(express.static(`${__dirname}/client`));
app.use(express.json());
app.use(cors());
app.use(authentication);
app.use(router);

io.on('connection', (socket) => {
  logger.log('a user connected');
  socket.on('user-logged-in', (sessionId) => logger.log(`user logged in (sessionId: ${sessionId})`));
  socket.on('disconnect', () => { logger.log('user disconnected'); });
});

module.exports = http;
