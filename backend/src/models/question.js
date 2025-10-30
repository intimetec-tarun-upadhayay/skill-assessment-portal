const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Question = sequelize.define('Question', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  skillId: { type: DataTypes.INTEGER, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
  options: { type: DataTypes.JSON, allowNull: false }, // ["A", "B", "C", "D"]
  correctIndex: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'questions',
  timestamps: true,
});

module.exports = Question;
