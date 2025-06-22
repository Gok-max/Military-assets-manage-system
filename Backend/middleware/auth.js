const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user to get base and role
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: 'Invalid user' });

    req.user = { id: user._id, base: user.base, role: user.role }; // ✅ real base!
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Token error' });
  }
};
