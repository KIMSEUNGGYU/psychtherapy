"use strict";
const { Model, Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  class schedules2 extends Model {
    static associate(models) {
      schedules2.belongsTo(models.partnerDetails, {
        foreignKey: "partnerId",
        targetKey: "partnerId",
      });
    }
  }
  schedules2.init(
    {
      partnerId: DataTypes.INTEGER,
      day: DataTypes.ENUM("mon","tue","wed","thu","fri","sat","sun"),
      time: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "new_schedules",
    },
  );

  schedules2.getSchedulesByPartnerIdDay = async (partnerId, day) => {

    return await schedules2.findAll({
      attributes: [
        ["id", "scheduleId"],"day","time",
      ],
      where: {
        partnerId,
        day,
      },
    });
  };

  schedules2.createSchedules = async _schedules => {
    try {
      return await schedules2.bulkCreate(_schedules);
    } catch (err) {
      return false;
    }
  };

  schedules2.deleteSchedules = async (partnerId, day) => {
    await schedules2.destroy({
      where: {
        partnerId,
        day,
      },
    });
  };

  schedules2.scheduleIdCotainPartnerId = async (scheduleId, partnerId) =>
    await schedules2.findOne({
      raw: true,
      where: { id: scheduleId, partnerId },
    });

  schedules2.getSchedule = async (models, condition) => {
    const name = condition.userId ? [sequelize.col("partnerDetail.name"),"name"] : [sequelize.col("userDetail.name"),"name"];
    return await schedules2.findAll({
      attributes: [
        ["id", "scheduleId"],
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
      ],
      include: [
        {
          model: models.partnerDetails,
          attributes: [],
        }
      ],
      raw: true,
      where: { ...condition },
    });
  };

  schedules2.getScheduleByScheduleId = async scheduleId => {
    return await schedules.findOne({
      raw: true,
      attributes: ["startedAt"],
      where: { id: scheduleId },
    });
  };

  return schedules2;
};
