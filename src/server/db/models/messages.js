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

  messages.insertMessage = (roomId, content) =>
    messages.create({ roomId, content });

  messages.getContentByRoomId = async roomId => {
    return await messages.findOne({
      raw: true,
      attributes: ["content"],
      where: { roomId: roomId },
    });
  };

  messages.checkRoom = roomId =>
    messages.findOne({ raw: true, where: { roomId } });

  messages.updateMessage = (roomId, content) =>
    messages.update({ roomId, content }, { where: { roomId } });

  return messages;
};
