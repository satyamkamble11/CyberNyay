const express = require('express');
const QuizResult = require('../models/QuizResult');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/quiz/submit
// @desc    Submit quiz answers & calculate XP
// @access  Private
router.post('/submit', protect, async (req, res) => {
  try {
    const { unit, score, totalQuestions, timeTaken, answers, xpEarned } = req.body;

    // Create quiz result
    const quizResult = await QuizResult.create({
      userId: req.user._id,
      unit,
      score,
      totalQuestions,
      timeTaken,
      answers,
      xpEarned
    });

    // Update user's total XP and streak
    const user = await User.findById(req.user._id);
    if (user) {
      user.xp += xpEarned;
      // Simple streak logic: increment streak for completing a quiz (can be made more complex)
      user.streak += 1;
      await user.save();
    }

    res.status(201).json(quizResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/quiz/me
// @desc    Get user's own quiz history
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
