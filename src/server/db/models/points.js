"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class points extends Model {
    static associate(models) {
      points.belongsTo(models.userDetails, {
        foreignKey: "userId",
        targetKey: "userId",
      });
    }
  }
  points.init(
    {
      point: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "points",
    },
  );

  points.signup = async (userId, transaction) => {
    const defaultPoint = 0;
    return await points.create(
      { userId, point: defaultPoint },
      { transaction },
    );
  };

  points.getPointByUserId = async userId => {
    return await points.findOne({ raw: true, where: { userId } });
  };

  points.charge = async (userId, _point) => {
    try {
      let { point } = await points.getPointByUserId(userId);
      point += _point;
      return await points.update({ point }, { where: { userId } });
    } catch (err) {
      return false;
    }
  };

  // points.purchase = async (userId, _point, partnerId) => {
  //   try {
  //     let { point } = await points.getPointByUserId(userId);
  //     if (point < _point) {
  //       throw new Error("포인트가 부족합니다.");
  //     }

  //   } catch (err) {
  //     return false;
  //   }
  // };

  return points;
};
