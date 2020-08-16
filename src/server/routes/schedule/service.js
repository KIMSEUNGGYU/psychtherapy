const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");

exports.getSchedulesByPartnerIdDate = async (partnerId, date) => {
  try {
    return await models.schedules.getSchedulesByPartnerIdDate(partnerId, date);
  } catch (err) {
    return false;
  }
};

exports.createSchedules = async (partnerId, schedules) => {
  try {
    schedules = schedules.map(schedule => {
      return {
        partnerId,
        startedAt: schedule,
      };
    });

    return await models.schedules.createSchedules(schedules);
  } catch (err) {
    console.log(err);
    return false;
  }
};
