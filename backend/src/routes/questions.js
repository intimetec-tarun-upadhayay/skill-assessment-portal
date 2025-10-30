const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const { createQuestion } = require('../controllers/questionController');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

// Get all questions for a specific skill
router.get('/by-skill/:skillId', verifyToken, questionController.bySkill);

router.post('/', verifyToken, verifyAdmin, createQuestion);

module.exports = router;
