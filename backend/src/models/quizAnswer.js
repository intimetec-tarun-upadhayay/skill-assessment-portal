const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const QuizAnswer = sequelize.define('QuizAnswer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  attemptId: { type: DataTypes.INTEGER, allowNull: false },
  questionId: { type: DataTypes.INTEGER, allowNull: false },
  selectedIndex: { type: DataTypes.INTEGER, allowNull: false },
  correct: { type: DataTypes.BOOLEAN, allowNull: false }
}, {
  tableName: 'quiz_answers',
  timestamps: false,
});

module.exports = QuizAnswer;
