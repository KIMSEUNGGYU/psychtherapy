const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");

exports.pointCharge = async (userId, point) => {
  return await models.points.charge(userId, point);
};

exports.pointPurchase = async (userId, point, partnerId) => {
  let { point: userPoint } = await models.points.getPointByUserId(userId);
  let { point: partnerPoint } = await models.points.getPointByUserId(partnerId);

  if (userPoint < point) {
    throw new SyntaxError("포인트가 부족합니다.");
  }

  _userPoint = userPoint - point;
  _partnerPoint = partnerPoint + point;

  await models.points.update(
    { point: userPoint - point },
    { where: { userId: userId } },
  );
  await models.points.update(
    { point: partnerPoint + point },
    { where: { userId: partnerId } },
  );

  return true;
};
