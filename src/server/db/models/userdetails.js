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
    },
  );

  userDetails.signup = async (userId, name, age, gender, transaction) => {
    return await userDetails.create(
      { userId, name, age, gender },
      { transaction },
    );
  };

  userDetails.getUsers = async models => {
    return await userDetails.findAll({
      raw: true,
      attributes: {
        include: [
          [sequelize.col("user.id"), "id"],
          [sequelize.col("user.email"), "email"],
          "name",
          "gender",
          "age",
        ],
        exclude: ["id", "userId", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: models.users,
          attributes: [],
        },
      ],
    });
  };

  return userDetails;
};
