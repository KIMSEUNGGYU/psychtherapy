"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class keywords extends Model {
    static associate(models) {}
  }

  keywords.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "keywords",
    },
  );

  keywords.getKeywords = async () => {
    return await keywords.findAll({ raw: true, attributes: ["name"] });
  };

  return keywords;
};
