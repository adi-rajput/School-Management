"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    static associate(models) {
      // define association here
    }
  }
  School.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 7),  // Ensure DECIMAL with precision
        allowNull: false,
        unique: true
      },
      longitude: {
        type: DataTypes.DECIMAL(10, 7),  // Ensure DECIMAL with precision
        allowNull: false,
        unique: true
      },
    },
    {
      sequelize,
      modelName: "School",
    }
  );
  return School;
};
