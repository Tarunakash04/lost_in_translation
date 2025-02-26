const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
});

async function testDBConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
    
    // Sync models (creates table if it doesn’t exist)
    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced!");

  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

testDBConnection();

module.exports = sequelize;
