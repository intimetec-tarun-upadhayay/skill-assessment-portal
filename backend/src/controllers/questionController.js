const { Question } = require('../models');

exports.create = async (req, res) => {
    const { skillId, text, options, correctIndex } = req.body;
    try {
      const question = await Question.create({ skillId, text, options, correctIndex });
      res.status(201).json(question);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Could not create question' });
    }
  };

  exports.bySkill = async (req, res) => {
    try {
      const questions = await Question.findAll({ where: { skillId: req.params.skillId } });
      res.json(questions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Could not fetch questions' });
    }
  };
  
  exports.createQuestion = async (req, res) => {
    try {
      const { skillId, text, options, correctIndex } = req.body;
      const user = req.user; // from auth middleware
  
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admin can add questions' });
      }
  
      if (!skillId || !text || !options || correctIndex === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const question = await Question.create({
        skillId,
        text,
        options,
        correctIndex,
      });
  
      res.status(201).json({ message: 'Question added successfully', question });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  