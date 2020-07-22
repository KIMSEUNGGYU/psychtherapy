"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class partnerDetails extends Model {
    static associate(models) {
      partnerDetails.belongsTo(models.users, {
        foreignKey: "partnerId",
        targetKey: "id",
      });
      partnerDetails.hasMany(models.schedules, {
        foreignKey: "partnerId",
        sourceKey: "partnerId",
      });
    }
  }
  partnerDetails.init(
    {
      partnerId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      gender: DataTypes.TINYINT,
      age: DataTypes.TINYINT,
      url: DataTypes.STRING,
      shortInfo: DataTypes.STRING,
      career: DataTypes.TEXT,
      info: DataTypes.TEXT,
      chatCost: DataTypes.INTEGER,
      keyword: DataTypes.STRING,
      level: DataTypes.TINYINT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "partnerDetails",
    }
  );
  return partnerDetails;
};
