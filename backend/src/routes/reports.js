const express = require('express');
const { getAllReports } = require('../controllers/reportController');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');
const router = express.Router();

// Only admin can access reports
router.get('/', verifyToken, verifyAdmin, getAllReports);

module.exports = router;
