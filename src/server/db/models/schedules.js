"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class schedules extends Model {
    static associate(models) {
      schedules.belongsTo(models.userDetails, {
        foreignKey: "userId",
        targetKey: "userId",
      });
      schedules.belongsTo(models.partnerDetails, {
        foreignKey: "partnerId",
        targetKey: "partnerId",
      });
    }
  }
  schedules.init(
    {
      userId: DataTypes.INTEGER,
      partnerId: DataTypes.INTEGER,
      startedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "schedules",
    },
  );
  schedules.reserveConfirm = async (
    userId,
    partnerId,
    scheduleId,
    transaction,
  ) => {
    return await schedules.update(
      { userId },
      { where: { partnerId, id: scheduleId } },
      { transaction },
    );
  };

  return schedules;
};
