const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const Assignment = require('../models/Assignment');

// GET /api/assignment
router.get('/', auth, async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
});

// POST /api/assignment
router.post('/', auth, role(['admin', 'commander']), async (req, res) => {
  const { base, type, assignedTo, quantity } = req.body;
  const assignment = await Assignment.create({
    base,
    type,
    assignedTo,
    quantity,
    expended: false,
    date: new Date()
  });
  res.json(assignment);
});

// PUT /api/assignment/:id/mark-expended
router.put('/:id/mark-expended', auth, role(['admin', 'commander']), async (req, res) => {
  const { id } = req.params;
  const assignment = await Assignment.findByIdAndUpdate(id, { expended: true }, { new: true });
  res.json(assignment);
});

module.exports = router;
