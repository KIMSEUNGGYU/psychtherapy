const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");

exports.getUsers = async (page, size) => {
  const limit = size;
  const offset = (page - 1) * size;

  return await models.userDetails.getUsers(models, limit, offset);
};

exports.getPartners = async (page, size, evaluate) => {
  const limit = size;
  const offset = (page - 1) * size;

  const condition = { evaluate };

  const partners = await models.partnerDetails.getPartners(
    models,
    condition,
    limit,
    offset,
  );
  return partners;
};

exports.updatePartnerDetail = async (partnerId, partner) => {
  const result = await models.partnerDetails.updatePartner(partnerId, partner);
  return result[0]; // query 결과가 배열로 반환됨.
};
