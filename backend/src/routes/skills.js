const express = require('express');
const { createSkill, getAllSkills } = require('../controllers/skillController');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');
const router = express.Router();

router.get('/', getAllSkills);
router.post('/', verifyToken, verifyAdmin, createSkill);

module.exports = router;
