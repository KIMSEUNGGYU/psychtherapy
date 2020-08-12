"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.hasOne(models.userDetails, {
        foreignKey: "userId",
        sourceKey: "id",
      });
      users.hasOne(models.partnerDetails, {
        foreignKey: "partnerId",
        sourceKey: "id",
      });
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      type: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "users",
    },
  );

  users.signup = async (email, password, type, transaction) =>
    await users.create({ email, password, type }, { transaction });

  users.signin = async (email, password) =>
    await users.findOne({
      raw: true,
      attributes: ["id", "type"],
      where: { email, password },
    });

  users.getUser = async email => await users.findOne({ where: { email } });

  return users;
};
