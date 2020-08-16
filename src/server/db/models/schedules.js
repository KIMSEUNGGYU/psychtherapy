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

  schedules.getScheduleByPartnerId = async partnerId => {
    return await schedules.findAll({
      attributes: [
        ["id", "scheduleId"],
        [sequelize.literal("IF (userId IS NULL, false, true)"), "reservation"],
        "startedAt",
      ],
      where: { partnerId },
    });
  };

  schedules.createSchedules = async _schedules => {
    return await schedules.bulkCreate(_schedules);
  };

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

  schedules.getUserIdBySchedule = async scheduleId =>
    await schedules.findOne({
      raw: true,
      attributes: ["userId"],
      where: { id: scheduleId },
    });

  schedules.scheduleIdCotainPartnerId = async (scheduleId, partnerId) =>
    await schedules.findOne({
      raw: true,
      where: { id: scheduleId, partnerId },
    });

  schedules.getSchedule = async userId => {
    return await schedules.findAll({
      attributes: [
        ["id", "scheduleId"],
        [sequelize.literal("IF (userId IS NULL, false, true)"), "reservation"],
        "startedAt",
      ],
      raw: true,
      where: { userId },
    });
  };

  return schedules;
};
