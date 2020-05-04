const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const http = require('../src/server');
const { URI, PORT } = require('../config');

const startServer = () => {
  http.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
};

const connectToDatabase = () => {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
};

connectToDatabase()
  .on('error', console.log)
  .on('disconnected', connectToDatabase)
  .once('open', startServer);
