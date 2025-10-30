const QuizAttempt = require('../models/quizAttempt');
const User = require('../models/user');
const Skill = require('../models/skill');

// GET /reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await QuizAttempt.findAll({
        include: [
          { model: User, attributes: ['id', 'name', 'email', 'role'] },
          { model: Skill, attributes: ['id', 'name'] },
        ],
      });
      
    

    const formattedReports = reports.map(r => ({
      id: r.id,
      userName: r.User.name,
      userEmail: r.User.email,
      userRole: r.User.role,
      skillName: r.Skill.name,
      score: r.score,
      date: r.createdAt,
    }));

    res.json(formattedReports);
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
};
