// src/config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * Creates a Sequelize instance for connecting to MySQL database.
 * Reads credentials from .env file
 */

const sequelize = new Sequelize(
  process.env.DB_NAME || 'skill_assessment',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false, // set true to log SQL queries
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      underscored: true, // converts camelCase to snake_case in DB
    },
  }
);

// Function to test connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
  }
}

testConnection();

module.exports = sequelize;
