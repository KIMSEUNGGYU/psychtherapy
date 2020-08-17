"use strict";
const { Model, Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");

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

  schedules.getSchedulesByPartnerIdDate = async (partnerId, date) => {
    let startDate = date;
    let endDate = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD 23:59:59");

    return await schedules.findAll({
      attributes: [
        ["id", "scheduleId"],
        [sequelize.literal("IF (userId IS NULL, false, true)"), "reservation"],
        "startedAt",
      ],
      where: {
        partnerId,
        startedAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
  };

  schedules.createSchedules = async _schedules => {
    try {
      return await schedules.bulkCreate(_schedules);
    } catch (err) {
      return false;
    }
  };

  schedules.deleteSchedules = async (partnerId, scheduleId) => {
    await schedules.destroy({
      where: {
        partnerId: partnerId,
        id: scheduleId,
      },
    });
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

  return schedules;
};
