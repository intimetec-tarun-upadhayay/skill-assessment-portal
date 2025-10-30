const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Skill = sequelize.define('Skill', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT }
}, {
  tableName: 'skills',
  timestamps: true,
});

module.exports = Skill;
