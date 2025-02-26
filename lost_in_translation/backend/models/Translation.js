const { Sequelize, DataTypes } = require("sequelize");  // ✅ Import Sequelize & DataTypes
const sequelize = require("../config/db");  // ✅ Import Database Instance

const Translation = sequelize.define("Translation", {  // ✅ Define Model Correctly
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  translatedText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sourceLang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  targetLang: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Translation;  // ✅ Export Model
