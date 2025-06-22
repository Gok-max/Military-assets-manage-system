const Log = require('../models/Log');

module.exports = async function (req, res, next) {
  await Log.create({
    method: req.method,
    endpoint: req.originalUrl,
    user: req.user ? req.user.email : 'Guest',
    timestamp: new Date()
  });
  next();
};
