const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { router, authentication } = require('./middlewares');

app.use(express.static(path.resolve('./client/src')));
app.use(express.json());
app.use(cors());
app.use(authentication);
app.use(router);

io.on('connection', (socket) => {
  socket.on('user-logged-in', () => {
    socket.emit('games-list-updated');
  });

  socket.on('create-new-game', () => {
    socket.emit('games-list-updated');
    socket.broadcast.emit('games-list-updated');
  });

  socket.on('connect-to-game', () => {
    socket.emit('get-game-status');
    socket.emit('games-list-updated');
    socket.broadcast.emit('games-list-updated');
  });

  socket.on('make-step', () => {
    socket.emit('get-game-status');
    socket.broadcast.emit('get-game-status');
  });
});

module.exports = http;
