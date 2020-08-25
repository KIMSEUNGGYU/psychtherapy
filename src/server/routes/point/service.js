const crypto = require("crypto");

const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");

exports.pointCharge = async (userId, point) =>
  await models.points.charge(userId, point);

exports.getUserIdBySchedule = async scheduleId =>
  await models.schedules.getUserIdBySchedule(scheduleId);

exports.scheduleIdCotainPartnerId = async (scheduleId, partnerId) =>
  await models.schedules.scheduleIdCotainPartnerId(scheduleId, partnerId);

exports.pointPurchase = async (
  userId,
  point,
  partnerId,
  roomId,
  scheduleId,
) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    let { point: userPoint } = await models.points.getPointByUserId(userId);
    let { point: partnerPoint } = await models.points.getPointByUserId(
      partnerId,
    );

    if (userPoint < point) {
      throw new SyntaxError("포인트가 부족합니다.");
    }

    userPoint -= point;
    partnerPoint += point;

    await models.points.updatePoint(userId, userPoint, transaction);
    await models.points.updatePoint(partnerId, partnerPoint, transaction);

    await models.schedules.reserveConfirm(
      userId,
      partnerId,
      roomId,
      scheduleId,
      transaction,
    );

    // 스케쥴 확정 붙여주면 됩니다.
    transaction.commit();
    return true;
  } catch (err) {
    console.log(`err : ${err}`);
    transaction.rollback();
  }
};

exports.getScheduleByScheduleId = async scheduleId =>
  await models.schedules.getScheduleByScheduleId(scheduleId);

exports.makeRoomId = (userId, partnerId, startedAt) =>
  crypto
    .createHash("sha512")
    .update(`${userId}${partnerId}${startedAt}`)
    .digest("hex")
    .substr(0, 10);
