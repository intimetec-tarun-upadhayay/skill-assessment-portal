const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

/**
 * Middleware: Verify JWT token and attach decoded user to req.user
 */
exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optionally fetch full user info from DB (if you want fresh data)
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found or deactivated' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/**
 * Middleware: Restrict access to admin users only
 */
exports.verifyAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  next();
};
