"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class partnerDetails extends Model {
    static associate(models) {
      partnerDetails.belongsTo(models.users, {
        foreignKey: "partnerId",
        targetKey: "id",
      });
      partnerDetails.hasMany(models.schedules, {
        foreignKey: "partnerId",
        sourceKey: "partnerId",
      });
    }
  }

  partnerDetails.init(
    {
      partnerId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      gender: DataTypes.TINYINT,
      age: DataTypes.TINYINT,
      phoneNumber: DataTypes.STRING,
      url: DataTypes.STRING,
      shortInfo: DataTypes.STRING,
      career: DataTypes.TEXT,
      info: DataTypes.TEXT,
      chatCost: DataTypes.INTEGER,
      keyword: DataTypes.STRING,
      certificate: DataTypes.TINYINT,
      level: DataTypes.TINYINT,
      image: DataTypes.STRING,
      evaluate: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "partnerDetails",
    },
  );

  partnerDetails.signup = async (
    partnerId,
    name,
    age,
    phoneNumber,
    gender,
    evaluate,
    transaction,
  ) => {
    return await partnerDetails.create(
      { partnerId, name, age, phoneNumber, gender, evaluate },
      { transaction },
    );
  };

  partnerDetails.updatePartner = async (partnerId, partner) => {
    return await partnerDetails.update(partner, {
      where: { partnerId },
    });
  };

  partnerDetails.getPartners = async (condition, models) => {
    const result = await partnerDetails.findAll({
      raw: true,
      attributes: {
        include: [
          [sequelize.col("user.id"), "id"],
          [sequelize.col("user.email"), "email"],
        ],
        exclude: ["id", "partnerId", "evaluate", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: models.users,
          attributes: [],
        },
      ],
      where: { ...condition },
    });
    return result;
  };

  partnerDetails.getPartner = async (condition, models) => {
    const result = await partnerDetails.findOne({
      raw: true,
      attributes: {
        include: [
          [sequelize.col("user.id"), "id"],
          [sequelize.col("user.email"), "email"],
        ],
        exclude: ["id", "partnerId", "evaluate", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: models.users,
          attributes: [],
        },
      ],
      where: { ...condition },
    });
    return result;
  };

  return partnerDetails;
};
