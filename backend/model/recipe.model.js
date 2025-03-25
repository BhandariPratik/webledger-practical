const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const SavedRecipe = sequelize.define(
  "SavedRecipe",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipe_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = SavedRecipe;
