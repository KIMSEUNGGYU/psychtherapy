"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rooms extends Model {
    static associate(models) {
      rooms.hasMany(models.messages, {
        foreignKey: "roomId",
        sourceKey: "roomId",
      });
    }
  }
  rooms.init(
    {
      roomId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "rooms",
    },
  );

  rooms.insertRoom = async (roomId, transaction) =>
    rooms.create({ roomId }, { transaction });

  return rooms;
};
