// src/services/seed.js
const bcrypt = require('bcrypt');
const { User, Skill, Question, sequelize } = require('../models');

(async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // ✅ Ensure DB connection
    await sequelize.authenticate();

    // ✅ Sync database schema (force false to keep data if exists)
    await sequelize.sync({ alter: true });
    console.log('🗄️  Database synchronized.');

    // ---------------------------------------------------
    // 👤 Create Admin User
    // ---------------------------------------------------
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'Admin@123';

    let admin = await User.findOne({ where: { email: adminEmail } });
    if (!admin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      admin = await User.create({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`✅ Admin created: ${adminEmail} (password: ${adminPassword})`);
    } else {
      console.log('ℹ️ Admin user already exists, skipping creation.');
    }

    // ---------------------------------------------------
    // 👥 Create Sample Users (for testing)
    // ---------------------------------------------------
    const usersData = [
      {
        name: 'Rohit Sharma',
        email: 'rohit@gmail.com',
        password: await bcrypt.hash('User@123', 10),
        role: 'user',
      },
      {
        name: 'Priya Mehta',
        email: 'priya@gmail.com',
        password: await bcrypt.hash('User@123', 10),
        role: 'user',
      },
    ];

    for (const userData of usersData) {
      const existingUser = await User.findOne({ where: { email: userData.email } });
      if (!existingUser) {
        await User.create(userData);
        console.log(`✅ User created: ${userData.email}`);
      } else {
        console.log(`ℹ️ User already exists: ${userData.email}`);
      }
    }

    // ---------------------------------------------------
    // 🧠 Create Sample Skills
    // ---------------------------------------------------
    const skillsData = [
      { name: 'JavaScript', description: 'Core concepts of JavaScript' },
      { name: 'Node.js', description: 'Backend development with Node.js' },
      { name: 'React', description: 'Frontend development with React.js' },
      { name: 'Database', description: 'SQL and relational database concepts' },
    ];

    for (const skillData of skillsData) {
      const [skill, created] = await Skill.findOrCreate({
        where: { name: skillData.name },
        defaults: skillData,
      });
      if (created) console.log(`✅ Skill added: ${skill.name}`);
      else console.log(`ℹ️ Skill already exists: ${skill.name}`);

      // ---------------------------------------------------
      // 🧩 Add sample questions for each skill
      // ---------------------------------------------------
      const existingQuestions = await Question.findAll({ where: { skillId: skill.id } });
      if (existingQuestions.length === 0) {
        const sampleQuestions = [
          {
            skillId: skill.id,
            text: `Which keyword is used to declare a variable in ${skill.name}?`,
            options: ['var', 'let', 'const', 'all of the above'],
            correctIndex: 3,
          },
          {
            skillId: skill.id,
            text: `What is 2 + 2 in ${skill.name}?`,
            options: ['1', '2', '3', '4'],
            correctIndex: 3,
          },
        ];

        await Question.bulkCreate(sampleQuestions);
        console.log(`✅ Added ${sampleQuestions.length} questions for ${skill.name}`);
      } else {
        console.log(`ℹ️ Questions already exist for ${skill.name}`);
      }
    }

    console.log('\n🎉 Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
})();
