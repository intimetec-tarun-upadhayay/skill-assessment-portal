const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user
router.post('/register', authController.register);

// Login and get JWT token
router.post('/login', authController.login);

module.exports = router;
