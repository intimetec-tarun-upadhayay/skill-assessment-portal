const { Skill } = require('../models');

exports.createSkill = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required.' });
    }

    const existing = await Skill.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ message: 'Skill already exists.' });
    }

    const skill = await Skill.create({ name, description });
    res.status(201).json({ message: 'Skill created successfully', skill });
  } catch (err) {
    console.error('Error creating skill:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll();
    res.json(skills);
  } catch (err) {
    console.error('Error fetching skills:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
