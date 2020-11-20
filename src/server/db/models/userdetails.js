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
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "userDetails",
    },
  );

  userDetails.signup = async (userId, name, age, gender, phoneNumber, transaction) => {
    return await userDetails.create(
      { userId, name, age, gender, phoneNumber },
      { transaction },
    );
  };

  userDetails.getUsers = async (models, limit, offset) => {
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
      limit,
      offset,
      include: [
        {
          model: models.users,
          attributes: [],
          where: { type: 0 },
        },
      ],
    });
  };

  userDetails.getUserPoint = async (models, userId) => {
    return userDetails.findOne({
      raw: true,
      attributes: {
        include: [
          [sequelize.col("user.id"), "id"],
          [sequelize.col("user.email"), "email"],
          [sequelize.col("point.point"), "point"],
        ],
        exclude: ["id", "userId", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: models.users,
          attributes: [],
        },
        {
          model: models.points,
          attributes: [],
        },
      ],
      where: { userId },
    });
  };

  userDetails.userTotalCount = async () =>
    userDetails.findAll({
      raw: true,
      attributes: [[sequelize.fn("count", "*"), "totalCount"]],
    });

  return userDetails;
};
