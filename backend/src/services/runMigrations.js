// src/services/runMigrations.js
const { sequelize } = require('../models');

(async () => {
  try {
    console.log('🟢 Starting database migration...');
    await sequelize.sync({ alter: true });

    console.log('✅ Database migration completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
})();
