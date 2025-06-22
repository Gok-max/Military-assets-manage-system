const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const Purchase = require('../models/Purchase');

// GET /api/purchase (with optional filters)
router.get('/', auth, async (req, res) => {
  const { base, type } = req.query;
  const filter = {};
  if (base) filter.base = base;
  if (type) filter.type = type;

  const purchases = await Purchase.find(filter);
  res.json(purchases);
});

// POST /api/purchase
router.post('/', auth, role(['admin', 'logistics']), async (req, res) => {
  const { assetId, quantity, base, type } = req.body;
  const purchase = await Purchase.create({
    assetId, quantity, base, type, date: new Date()
  });
  res.json(purchase);
});

module.exports = router;
