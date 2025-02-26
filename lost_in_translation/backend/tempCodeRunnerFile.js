const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const translateRoutes = require("./routes/translate.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", translateRoutes);

app.get("/", (req, res) => {
    res.send("API is running...");
  });
  

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  // Ensure DB is synced
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Database is synced!");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
});
