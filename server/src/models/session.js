const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
  userId: String,
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
