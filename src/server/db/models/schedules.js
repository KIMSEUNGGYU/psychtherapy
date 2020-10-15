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
      roomId: DataTypes.STRING,
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
        [
          sequelize.Sequelize.fn(
            "date_format",
            sequelize.Sequelize.col("startedAt"),
            "%Y-%m-%d %H:%i:%s",
          ),
          "startedAt",
        ],
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
    roomId,
    scheduleId,
    transaction,
  ) => {
    return await schedules.update(
      { userId, roomId },
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

  schedules.getUserInfoBySchedule = async (models, userId) =>
    await schedules.findOne({
      raw: true,
      where: { userId },
      attributes: [
        sequelize.Sequelize.col("userDetail.name","name"),
        sequelize.Sequelize.col("userDetail.gender","gender"),
        sequelize.Sequelize.col("userDetail.age","age"),
      ],
      include: [
        {
          model: models.userDetails,
          attributes: []
        },
      ]
    });

  schedules.scheduleIdCotainPartnerId = async (scheduleId, partnerId) =>
    await schedules.findOne({
      raw: true,
      where: { id: scheduleId, partnerId },
    });

  schedules.getSchedule = async (models, condition) => {
    const name = condition.userId ? [sequelize.col("partnerDetail.name"),"name"] : [sequelize.col("userDetail.name"),"name"];
    return await schedules.findAll({
      attributes: [
        ["id", "scheduleId"],
        [sequelize.literal("IF (schedules.userId IS NULL, false, true)"), "reservation"],
        "roomId",
        [
          sequelize.Sequelize.fn(
            "date_format",
            sequelize.Sequelize.col("startedAt"),
            "%Y-%m-%d %H:%i:%s",
          ),
          "startedAt",
        ],
        name,
        "partnerId",
        "userId"
      ],
      include: [
        {
          model: models.userDetails,
          attributes: [], 
        },
        {
          model: models.partnerDetails,
          attributes: [],
        }
      ],
      raw: true,
      where: { ...condition },
    });
  };

  schedules.getScheduleByScheduleId = async scheduleId => {
    return await schedules.findOne({
      raw: true,
      attributes: ["startedAt"],
      where: { id: scheduleId },
    });
  };

  return schedules;
};
