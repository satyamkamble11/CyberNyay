const express = require('express');
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all admin routes
router.use(protect, admin);

// GET /api/admin/users - list all users (no passwords)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    console.error('Admin list users error:', err.stack || err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/users/:id - get single user
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) return res.json(user);
    res.status(404).json({ message: 'User not found' });
  } catch (err) {
    console.error('Admin get user error:', err.stack || err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/admin/users/:id - update user (name, email, role)
router.put('/users/:id', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();
    const updated = await User.findById(req.params.id).select('-password');
    res.json(updated);
  } catch (err) {
    console.error('Admin update user error:', err.stack || err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/admin/users/:id/reset-password - set a new password
router.put('/users/:id/reset-password', async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = password;
    await user.save(); // triggers pre-save hook to hash

    res.json({ message: 'Password updated' });
  } catch (err) {
    console.error('Admin reset password error:', err.stack || err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/admin/users/:id - remove a user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.remove();
    res.json({ message: 'User removed' });
  } catch (err) {
    console.error('Admin delete user error:', err.stack || err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
