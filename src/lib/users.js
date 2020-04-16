const uuid = require('uuid');
const Game = require('../game');

const sessions = [];

const games = [];

const activeGames = [];

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

function signIn(username, password) {
  if (!username || !password) {
    return { status: 400, message: 'Incorrect username or password.' };
  }

  const user = users.find((el) => el.username === username);
  if (user) {
    return { status: 400, message: 'Username is already taken.' };
  }
  users.push({
    uuid: uuid.v4(),
    username,
    password,
  });
  return { status: 200, message: 'Success.' };
}

function logIn(username, password) {
  const user = users.find((el) => el.username === username && el.password === password);

  if (!user) {
    return { status: 400, message: 'Unknown username or wrong password.' };
  }

  const session = sessions.find((el) => el.userUuid === user.uuid);

  let sessionUuid;

  if (session) {
    sessionUuid = session.uuid;
  } else {
    sessionUuid = uuid.v4();
    sessions.push({
      uuid: sessionUuid,
      userUuid: user.uuid,
    });
  }

  return { status: 200, message: sessionUuid };
}

function createNewGame(sessionUuid) {
  const session = sessions.find((el) => el.uuid === sessionUuid);
  if (!session) {
    return { status: 400, message: 'Unknown session.' };
  }

  const game = new Game();

  games.push(game);

  return { status: 200, message: game.uuid };
}

function getGames() {
  return { status: 200, games };
}

function connectToGame(gameUuid, sessionUuid) {
  const session = sessions.find((el) => el.uuid === sessionUuid);
  const user = users.find((el) => el.uuid === session.userUuid);

  let message;

  games.forEach((el) => {
    if (el.uuid === gameUuid) {
      if (el.player1Uuid === '') {
        if (el.player2Uuid !== user.uuid) {
          el.setPlayer1(user.uuid, user.username);
        } else {
          message = 'You have already connected to this game.';
        }
      } else if (el.player2Uuid === '') {
        if (el.player1Uuid !== user.uuid) {
          el.setPlayer2(user.uuid, user.username);
        } else {
          message = 'You have already connected to this game.';
        }
      } else {
        message = 'Can\'t connect to this game.';
      }
    }
  });

  if (message) {
    return { status: 400, message };
  }

  activeGames[session.uuid] = gameUuid;

  return { status: 200, message: 'Connection successfull.' };
}

function getGameStatus(gameUuid) {
  const game = games.find((el) => el.uuid === gameUuid);

  if (!game) {
    return { status: 400, message: 'Can\'t get status of this game.' };
  }

  return { status: 200, message: game.getTable() };
}

function getActiveGameStatus(sessionUuid) {
  const session = sessions.find((el) => el.uuid === sessionUuid);
  const activeGame = activeGames[session.uuid];
  const game = games.find((el) => el.uuid === activeGame.gameUuid);

  if (!game) {
    return { status: 400, message: 'Can\'t get status of this game.' };
  }

  return { status: 200, message: game.getTable() };
}

function makeStep(sessionUuid, x, y) {
  const activeGameUuid = activeGames[sessionUuid];
  const game = games.find((el) => el.uuid === activeGameUuid);

  if (!game) {
    return { status: 400, message: 'There is no active games.' };
  }

  const session = sessions.find((el) => el.uuid === sessionUuid);
  const user = users.find((el) => el.uuid === session.userUuid);

  const message = game.userCanMakeStep(user.uuid, x, y);
  if (message) {
    return { status: 400, message };
  }

  return { status: 200, message: game.makeStep(x, y) };
}

// #region Middlewares

function authentication(req, res, next) {
  req.userCredentials = sessions.find((el) => el.uuid === req.headers.authorization);
  next();
}

function authorization(req, res, next) {
  if (req.userCredentials) {
    next();
  } else {
    res.sendStatus(401);
  }
}

// #endregion

module.exports = {
  signIn,
  logIn,
  createNewGame,
  getGames,
  connectToGame,
  getGameStatus,
  getActiveGameStatus,
  makeStep,
  authentication,
  authorization,
};
