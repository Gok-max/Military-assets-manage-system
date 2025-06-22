const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
    fromBase: String,
    toBase: String,
    type: String, // ✅ Add this!
    quantity: Number,
    date: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Transfer', transferSchema);
  