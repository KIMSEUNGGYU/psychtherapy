"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tokens extends Model {
    static associate(models) {}
  }
  tokens.init(
    {
      userId: DataTypes.INTEGER,
      accessToken: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tokens",
    },
  );
  return tokens;
};
