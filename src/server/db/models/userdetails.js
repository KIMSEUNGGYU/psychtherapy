"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class userDetails extends Model {
    static associate(models) {
      userDetails.belongsTo(models.users, {
        foreignKey: "userId",
        targetKey: "id",
      });
      userDetails.hasOne(models.points, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
      userDetails.hasMany(models.schedules, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
    }
  }
  userDetails.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      gender: DataTypes.TINYINT,
      age: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "userDetails",
    }
  );

  userDetails.signup = async (userId, name, age, gender, transaction) => {
    return await userDetails.create(
      { userId, name, age, gender },
      { transaction }
    );
  };

  return userDetails;
};
