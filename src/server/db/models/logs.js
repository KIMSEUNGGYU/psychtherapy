"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class logs extends Model {
    static associate(models) {}
  }
  logs.init(
    {
      type: DataTypes.STRING,
      history: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "logs",
    },
  );
  return logs;
};
