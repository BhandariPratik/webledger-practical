const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const SavedReceipt = sequelize.define(
  "SavedReceipt",
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
    receipt_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = SavedReceipt;
