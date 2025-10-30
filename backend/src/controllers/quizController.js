const { Question, QuizAttempt, QuizAnswer, User, Skill } = require('../models');

exports.submit = async (req, res) => {
  const { skillId, answers } = req.body;
  const userId = req.user.id;

  try {
    const questionIds = answers.map(a => a.questionId);
    const questions = await Question.findAll({ where: { id: questionIds } });

    if (!questions || questions.length === 0) {
      return res.status(400).json({ message: 'No valid questions found.' });
    }

    let correctCount = 0;

    // Create quiz attempt first
    const attempt = await QuizAttempt.create({ userId, skillId, score: 0 });

    // Record each answer
    for (const a of answers) {
      const q = questions.find(q => q.id === a.questionId);
      const isCorrect = q && q.correctIndex === a.selectedIndex;
      if (isCorrect) correctCount++;

      await QuizAnswer.create({
        attemptId: attempt.id,
        questionId: a.questionId,
        selectedIndex: a.selectedIndex,
        correct: isCorrect,
      });
    }

    // Calculate score
    const score = answers.length ? (correctCount / answers.length) * 100 : 0;
    attempt.score = score;
    await attempt.save();

    res.json({ attemptId: attempt.id, score });
  } catch (err) {
    console.error('❌ Error submitting quiz:', err);
    res.status(500).json({ message: 'Could not submit quiz' });
  }
};

exports.userReports = async (req, res) => {
  try {
    const { userId } = req.params;

    // Only allow logged-in user or admin to view reports
    if (req.user.role !== 'admin' && req.user.id != userId) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    const reports = await QuizAttempt.findAll({
      where: { userId },
      include: [{ model: Skill, attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']],
    });

    res.json(
      reports.map(r => ({
        id: r.id,
        skillName: r.Skill?.name,
        score: r.score,
        date: r.createdAt,
      }))
    );
  } catch (err) {
    console.error('❌ Error fetching user reports:', err);
    res.status(500).json({ message: 'Could not fetch user reports' });
  }
};

exports.adminReports = async (req, res) => {
  try {
    // Only admin allowed
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const reports = await QuizAttempt.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email', 'role'] },
        { model: Skill, attributes: ['id', 'name'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    const formattedReports = reports.map(r => ({
      id: r.id,
      userName: r.User?.name,
      userEmail: r.User?.email,
      userRole: r.User?.role,
      skillName: r.Skill?.name,
      score: r.score,
      date: r.createdAt,
    }));

    res.json(formattedReports);
  } catch (err) {
    console.error('❌ Error fetching admin reports:', err);
    res.status(500).json({ message: 'Could not fetch reports' });
  }
};
