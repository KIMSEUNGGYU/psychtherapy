const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");

exports.getKeywords = async () => {
  const keywords = await models.keywords.getKeywords();
  return keywords.map(keyword => keyword["name"]);
};
