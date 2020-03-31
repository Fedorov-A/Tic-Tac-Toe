const express = require('express');
const cors = require('cors');

const app = express();
const routes = require('./routes');
const users = require('./lib/users');

app.use(express.json());
app.use(cors());
app.use(users.authorization);
app.use(routes);

module.exports = app;
