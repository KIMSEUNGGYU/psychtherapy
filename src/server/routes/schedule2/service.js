const models = require("../../db/models");

exports.getSchedulesByPartnerIdDay = async (partnerId, day) => {
  try {
    return await models.new_schedules.getSchedulesByPartnerIdDay(partnerId, day);
  } catch (err) {
    return false;
  }
};

exports.deleteSchedules = async (partnerId, day) => {
  try {
    await models.new_schedules.deleteSchedules(partnerId, day);
    return true;
  } catch (err) {
    return false;
  }
};

exports.createSchedules = async (partnerId, schedules) => {
  try {
    schedules = schedules.map(schedule => {
      return {
        partnerId,
        day: schedule.day,
        time: schedule.time,
      };
    });

    return await models.new_schedules.createSchedules(schedules);
  } catch (err) {
    console.log(err);
    return false;
  }
};
