// src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models'); // DB connection and models

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const skillRoutes = require('./routes/skills');
const questionRoutes = require('./routes/questions');
const quizRoutes = require('./routes/quiz');
const reports = require('./routes/reports');

const app = express();

// ===== MIDDLEWARES =====
app.use(cors());
app.use(bodyParser.json());

// ===== ROUTES =====
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/reports', reports);

// ===== HEALTH CHECK =====
app.get('/', (req, res) => {
  res.send('✅ Skill Assessment Portal Backend is running');
});

// ===== START SERVER =====
const PORT = process.env.PORT || 4000;

(async () => {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Sync models with database
    await sequelize.sync(); // use { alter: true } during development if needed
    console.log('✅ All models synchronized with DB.');

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to database:', error.message);
    process.exit(1);
  }
})();
