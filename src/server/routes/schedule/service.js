const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");

exports.getSchedules = async partnerId => {
  return await models.schedules.getScheduleByPartnerId(partnerId);
};

exports.createSchedules = async (partnerId, schedules) => {
  schedules = schedules.map(schedule => {
    return {
      partnerId,
      startedAt: schedule,
    };
  });
  return await models.schedules.createSchedules(schedules);
};
