const uuid = require('uuid');
const Game = require('../game');

const sessions = [];

const games = [];

const users = [
  {
    uuid: 'c86f5c90-9cdb-4633-b6a6-6b21b39e459c',
    username: 'user1',
    password: 'password1',
  },
  {
    uuid: '718cb90b-dbcb-407f-9690-7ad02affbec1',
    username: 'user2',
    password: 'password2',
  },
];

function signIn(login, password) {
  const user = users.find((el) => el.username === login);
  if (user) {
    return { status: 400, message: 'Username is already taken.' };
  }
  users.push({
    uuid: uuid.v4(),
    username: login,
    password,
  });
  return { status: 200, message: 'Success' };
}

function logIn(username, password) {
  const user = users.find((el) => el.username === username && el.password === password);

  if (!user) {
    return { status: 400, message: 'Unknown username or wrong password.' };
  }

  const session = sessions.find((el) => el.userUuid === user.uuid);

  let sessionUuid;

  if (session) {
    sessionUuid = session.sessionUuid;
  } else {
    sessionUuid = uuid.v4();
    sessions.push({
      userUuid: user.uuid,
      sessionUuid,
    });
  }

  return { status: 200, message: sessionUuid };
}

function createNewGame(sessionUuid) {
  const session = sessions.find((el) => el.sessionUuid === sessionUuid);
  games.push({
    userUuid: session.userUuid,
    game: new Game(),
  });
  console.log(games);
}

function getGames(sessionUuid) {
  const session = sessions.find((el) => el.sessionUuid === sessionUuid);
  const userGames = games.filter((el) => el.userUuid === session.userUuid);
  return { status: 200, userGames };
}

function authentication(req, res, next) {
  req.userCredentials = sessions.find((el) => el.sessionUuid === req.headers.authorization);
  next();
}

function authorization(req, res, next) {
  if (req.userCredentials) {
    next();
  } else {
    res.send(401);
  }
}

module.exports = {
  signIn,
  logIn,
  createNewGame,
  getGames,
  authentication,
  authorization,
};
