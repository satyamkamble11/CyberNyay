const express = require('express');
const User = require('../models/User');

const router = express.Router();

// @route   GET /api/leaderboard
// @desc    Get top 20 users by XP
// @access  Public
router.get('/', async (req, res) => {
  try {
    const topUsers = await User.find({ role: 'student' })
      .sort({ xp: -1 })
      .limit(20)
      .select('name xp streak badges college');
      
    res.json(topUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
