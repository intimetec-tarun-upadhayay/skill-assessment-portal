const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required.' });
      }
  
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ message: 'Email already registered.' });
      }
  
      const validRoles = ['admin', 'user'];
      const userRole = validRoles.includes(role) ? role : 'user'; // default to 'user'
  
      const hash = await bcrypt.hash(password, 10);
  
      const user = await User.create({ name, email, password: hash, role: userRole });
  
      res.status(201).json({
        message: 'User registered successfully.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error('Error in register:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
      );
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  