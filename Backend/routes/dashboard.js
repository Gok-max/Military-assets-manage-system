const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Purchase = require('../models/Purchase');
const Transfer = require('../models/Transfer');
const Assignment = require('../models/Assignment');

router.get('/', auth, async (req, res) => {
  const base = req.user?.base;
  const isAdmin = req.user.role === 'admin';

  console.log('Dashboard API - base used:', base);

  const matchPurchase = isAdmin ? {} : { base: base };
  const matchIn = isAdmin ? {} : { toBase: base };
  const matchOut = isAdmin ? {} : { fromBase: base };
  const matchAssign = isAdmin ? {} : { base: base };

  const [purchaseAgg, transfersInAgg, transfersOutAgg, assignmentsAgg] = await Promise.all([
    Purchase.aggregate([
      { $match: matchPurchase },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ]),
    Transfer.aggregate([
      { $match: matchIn },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ]),
    Transfer.aggregate([
      { $match: matchOut },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ]),
    Assignment.aggregate([
      { $match: matchAssign },
      { $group: { _id: null, total: { $sum: "$quantity" } } }
    ])
  ]);

  const purchases = purchaseAgg[0]?.total || 0;
  const transfersIn = transfersInAgg[0]?.total || 0;
  const transfersOut = transfersOutAgg[0]?.total || 0;
  const assignments = assignmentsAgg[0]?.total || 0;

  const openingBalance = purchases + transfersIn;
  const closingBalance = openingBalance - transfersOut - assignments;
  const netMovement = purchases + transfersIn - transfersOut;

  res.json({
    openingBalance,
    closingBalance,
    netMovement,
    purchases,
    transfersIn,
    transfersOut,
    assignments
  });
});

module.exports = router;
