const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");

exports.getSchedulesByPartnerIdDate = async (partnerId, date) => {
  try {
    return await models.schedules.getSchedulesByPartnerIdDate(partnerId, date);
  } catch (err) {
    return false;
  }
};

exports.deleteSchedules = async (partnerId, scheduleId) => {
  try {
    models.schedules.deleteSchedules(partnerId, scheduleId);
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
        startedAt: schedule,
      };
    });

    return await models.schedules.createSchedules(schedules);
  } catch (err) {
    console.log(err);
    return false;
  }
};

exports.getPartnerNote = async (roomId) => {
  return await models.schedules.getNote({roomId});
};

exports.putPartnerNote = async (note,roomId) => {
  let transaction;
  try{
    transaction = await sequelize.transaction();
    console.log('service note',note, roomId)
    await models.schedules.writeNote(note, { roomId }, transaction);
    transaction.commit();
    return true;
  } catch (err) {
    console.log(`err : ${err}`);
    transaction.rollback();
  }
};