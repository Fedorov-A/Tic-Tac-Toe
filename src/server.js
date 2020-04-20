const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const routes = require('./routes');
const users = require('./lib/users');

app.use(express.json());
app.use(cors());
app.use(users.authentication);
app.use(routes);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

module.exports = http;
