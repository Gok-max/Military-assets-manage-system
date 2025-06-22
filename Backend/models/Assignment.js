const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  base: String,
  type: String, // ✅ Add this!
  assignedTo: String, // ✅ Add this!
  quantity: Number,
  expended: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
