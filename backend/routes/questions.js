const express = require('express');
const Question = require('../models/Question');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/questions/:unit
// @desc    Get up to 10 random questions for a specific unit
// @access  Private (or Public if we want guests to preview)
router.get('/:unit', protect, async (req, res) => {
  try {
    const unit = parseInt(req.params.unit, 10);
    
    // Fetch random 10 questions for the given unit
    const questions = await Question.aggregate([
      { $match: { unit: unit } },
      { $sample: { size: 10 } }
    ]);

    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/questions
// @desc    Add a new question
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { unit, questionText, options, correctAnswer, explanation, sectionRef, difficulty } = req.body;

    const question = new Question({
      unit,
      questionText,
      options,
      correctAnswer,
      explanation,
      sectionRef,
      difficulty
    });

    const createdQuestion = await question.save();
    res.status(201).json(createdQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
