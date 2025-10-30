const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {verifyAdmin, verifyToken} = require('../middlewares/auth');

// Get own profile
router.get('/me', verifyToken, userController.getProfile);

// List all users (admin only)
router.get('/', verifyToken, verifyAdmin, userController.listUsers);

// Update a user's role (admin only)
router.put('/role', verifyToken, verifyAdmin, userController.updateRole);

module.exports = router;
