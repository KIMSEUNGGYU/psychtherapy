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
    }
  );
  return keywords;
};
