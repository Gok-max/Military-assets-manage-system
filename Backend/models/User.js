const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'commander', 'logistics'] },
  base: String
});

module.exports = mongoose.model('User', userSchema);
