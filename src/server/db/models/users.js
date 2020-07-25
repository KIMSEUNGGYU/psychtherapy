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
    },
    {
      sequelize,
      modelName: "users",
    }
  );

  return users;
};
