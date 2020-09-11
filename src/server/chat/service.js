const sequelize = require("../db/models").sequelize;
const models = require("../db/models");

exports.insertRoomAndMessages = async (roomId, messages) => {
  const messageConetent = {};
  messages.forEach((message, index) => {
    messageConetent[index] = message;
  });

  const content = JSON.stringify(messageConetent);

  let transaction;
  try {
    console.log("SAVE DATA ROOM AND MESSAGE");

    const checkRoom = await models.messages.checkRoom(roomId);
    // 방이 생성되지 않았다면
    if (checkRoom === null) {
      await models.messages.insertMessage(roomId, content);
    } else {
      // 이미 방이 존재한다면 update
      await models.messages.updateMessage(roomId, content);
    }

    return true;
  } catch (err) {
    console.error(err);
    transaction.rollback();
    return false;
  }
};
