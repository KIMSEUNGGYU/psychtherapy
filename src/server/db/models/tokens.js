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

  tokens.generateTokens = async (userId, accessToken, refreshToken) =>
    await tokens.create({ userId, accessToken, refreshToken });

  tokens.deleteRefreshToken = async refreshToken =>
    await tokens.destroy({ where: { refreshToken } });

  return tokens;
};
