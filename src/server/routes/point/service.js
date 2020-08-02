const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");

exports.pointCharge = async (userId, point) => {
  return await models.points.charge(userId, point);
};

exports.pointPurchase = async (userId, point, partnerId, scheduleId) => {
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
