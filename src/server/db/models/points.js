"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class points extends Model {
    static associate(models) {
      points.belongsTo(models.userDetails, {
        foreignKey: "userId",
        sourceKey: "userId",
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
    }
  );
  return points;
};
