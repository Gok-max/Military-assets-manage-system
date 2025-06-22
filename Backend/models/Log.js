const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  method: String,
  endpoint: String,
  user: String,
  timestamp: Date
});

module.exports = mongoose.model('Log', logSchema);
