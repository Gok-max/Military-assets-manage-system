const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const Transfer = require('../models/Transfer');

// GET /api/transfer
router.get('/', auth, async (req, res) => {
  const transfers = await Transfer.find();
  res.json(transfers);
});

// POST /api/transfer
router.post('/', auth, role(['admin', 'logistics']), async (req, res) => {
  const { fromBase, toBase, type, quantity } = req.body;
  const transfer = await Transfer.create({
    fromBase,
    toBase,
    type,
    quantity,
    date: new Date()
  });
  res.json(transfer);
});

module.exports = router;
