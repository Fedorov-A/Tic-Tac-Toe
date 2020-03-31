const uuid = require('uuid');

const sessions = {};

const users = [
  {
    id: 1,
    login: 'user1',
    password: 'password1',
  },
  {
    id: 2,
    login: 'user2',
    password: 'password2',
  },
];

function checkLogin(login, password) {
  let sessionId = '-1';
  const user = users.find((el) => el.login === login && el.password === password);
  if (user) {
    sessionId = uuid.v4();
    sessions[sessionId] = {
      id: user.id,
    };
  }

  return { id: sessionId };
}

function checkSession(sessionId) {
  return sessions[sessionId];
}

function authorization(req, res, next) {
  req.userCredentials = checkSession(req.headers.authorization);
  next();
}

function authorizationRequired(req, res, next) {
  if (req.userCredentials) {
    next();
  } else {
    res.send(401);
  }
}

module.exports = {
  checkLogin,
  checkSession,
  authorization,
  authorizationRequired,
};
