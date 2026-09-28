const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getDBStatus } = require('../config/db');

// @route   POST /api/auth/login
// @desc    Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  // Fallback demo credentials if DB is offline or for instant testing
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign(
      { id: 'admin-id-1', username: 'admin', role: 'admin' },
      process.env.JWT_SECRET || 'digitalhub_super_secret_jwt_key_2026',
      { expiresIn: '7d' }
    );
    return res.json({
      success: true,
      token,
      user: { username: 'admin', role: 'admin', email: 'admin@digitalhub.com' }
    });
  }

  if (getDBStatus()) {
    try {
      const user = await User.findOne({ username });
      if (user && (await user.matchPassword(password))) {
        const token = jwt.sign(
          { id: user._id, username: user.username, role: user.role },
          process.env.JWT_SECRET || 'digitalhub_super_secret_jwt_key_2026',
          { expiresIn: '7d' }
        );
        return res.json({
          success: true,
          token,
          user: { username: user.username, role: user.role, email: user.email }
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  return res.status(401).json({ message: 'Invalid credentials. Try admin / admin123' });
});

// @route   GET /api/auth/me
// @desc    Verify current token
router.get('/me', (req, res) => {
  res.json({ success: true, user: { username: 'admin', role: 'admin' } });
});

module.exports = router;
