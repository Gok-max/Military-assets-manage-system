const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: String,
  type: String, // vehicle, weapon, ammunition
  base: String,
  quantity: Number
});

module.exports = mongoose.model('Asset', assetSchema);
