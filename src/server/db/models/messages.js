"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class messages extends Model {
    static associate(models) {
      messages.belongsTo(models.rooms, {
        foreignKey: "roomId",
        targetKey: "roomId",
      });
    }
  }

  messages.init(
    {
      roomId: DataTypes.STRING,
      content: DataTypes.TEXT("medium"),
    },
    {
      sequelize,
      modelName: "messages",
    },
  );

  messages.insertMessage = (roomId, content, transaction) =>
    messages.create({ roomId, content }, { transaction });

  messages.getContentByRoomId = async roomId => {
    return await messages.findOne({
      raw: true,
      attributes: ["content"],
      where: { roomId: roomId },
    });
  };

  return messages;
};
