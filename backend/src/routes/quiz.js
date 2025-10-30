const express = require('express');
const {
  submit,
  userReports,
  adminReports,
} = require('../controllers/quizController');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

const router = express.Router();

router.post('/submit', verifyToken, submit);
router.get('/reports/:userId', verifyToken, userReports);
router.get('/admin-reports', verifyToken, verifyAdmin, adminReports);

module.exports = router;
