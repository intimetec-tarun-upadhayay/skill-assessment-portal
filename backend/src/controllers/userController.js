const { User } = require('../models');

/**
 * Get current logged-in user's profile
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role', 'createdAt']
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * List all users (admin only)
 */
exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'createdAt']
    });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update user role (admin only)
 */
exports.updateRole = async (req, res) => {
  const { userId, role } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = role;
    await user.save();

    res.json({ message: 'Role updated successfully', user });
  } catch (err) {
    console.error('Error updating role:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
