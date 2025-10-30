const sequelize = require('../config/db');
const User = require('./user');
const Skill = require('./skill');
const Question = require('./question');
const QuizAttempt = require('./quizAttempt');
const QuizAnswer = require('./quizAnswer');

// Associations
Skill.hasMany(Question, { foreignKey: 'skillId', onDelete: 'CASCADE' });
Question.belongsTo(Skill, { foreignKey: 'skillId' });

User.hasMany(QuizAttempt, { foreignKey: 'userId', onDelete: 'CASCADE' });
QuizAttempt.belongsTo(User, { foreignKey: 'userId' });

QuizAttempt.hasMany(QuizAnswer, { foreignKey: 'attemptId', onDelete: 'CASCADE' });
QuizAnswer.belongsTo(QuizAttempt, { foreignKey: 'attemptId' });

Question.hasMany(QuizAnswer, { foreignKey: 'questionId', onDelete: 'CASCADE' });
QuizAnswer.belongsTo(Question, { foreignKey: 'questionId' });

// QuizAttempt relations
QuizAttempt.belongsTo(User, { foreignKey: 'userId' });
QuizAttempt.belongsTo(Skill, { foreignKey: 'skillId' });

// QuizAnswer relation
QuizAnswer.belongsTo(QuizAttempt, { foreignKey: 'attemptId' });
QuizAnswer.belongsTo(Question, { foreignKey: 'questionId' });


module.exports = { sequelize, User, Skill, Question, QuizAttempt, QuizAnswer };
