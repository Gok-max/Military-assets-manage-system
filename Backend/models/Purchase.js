const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  assetId: mongoose.Schema.Types.ObjectId,
  quantity: Number,
  base: String,
  type: String,
  date: Date
});

module.exports = mongoose.model('Purchase', purchaseSchema);
