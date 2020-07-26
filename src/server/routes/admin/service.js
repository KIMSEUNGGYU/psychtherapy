const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");

exports.getUsers = async (page, size) => {
  const users = await models.userDetails.getUsers(models);
  return users;
};

exports.getPartners = async (page, size, evaluate) => {
  const condition = {
    evaluate,
  };

  const partners = await models.partnerDetails.getPartners(condition, models);
  return partners;
};

exports.updatePartnerDetail = async (partnerId, partner) => {
  const result = await models.partnerDetails.updatePartner(partnerId, partner);
  return result[0]; // query 결과가 배열로 반환됨.
};
