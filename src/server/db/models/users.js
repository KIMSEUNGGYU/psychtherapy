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

  users.signup = async (email, password, type, transaction) => {
    return await users.create({ email, password, type }, { transaction });
  };

  users.signin = async (email, password) => {
    return await users.findOne({ where: { email, password } });
  };

  users.emailCheck = async email => {
    return await users.findOne({ where: { email } });
  };

  return users;
};
