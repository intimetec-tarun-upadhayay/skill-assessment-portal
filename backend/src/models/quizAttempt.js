const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const QuizAttempt = sequelize.define(
  'QuizAttempt',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    skillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'skill_id',
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: 'quiz_attempts',
    timestamps: false, // ⛔ No timestamps
    underscored: true,
  }
);

QuizAttempt.associate = (models) => {
  QuizAttempt.belongsTo(models.User, { foreignKey: 'userId' });
  QuizAttempt.belongsTo(models.Skill, { foreignKey: 'skillId' });
};

module.exports = QuizAttempt;
