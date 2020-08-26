const sequelize = require("../db/models").sequelize;
const models = require("../db/models");

exports.insertRoomAndMessages = async (roomId, messages) => {
  const messageContent = {};
  let mess = "";
  messages.forEach(message => {
    message["roomId"] = roomId;
    mess += JSON.stringify(message);
  });
  messageContent[roomId] = mess;

  const content = JSON.stringify(messageContent);

  let transaction;
  try {
    console.log("SAVE DATA ROOM AND MESSAGE");
    transaction = await sequelize.transaction(); // 트랜잭션 생성
    await models.rooms.insertRoom(roomId, transaction);
    await models.messages.insertMessage(roomId, content, transaction);

    transaction.commit(); // 각 테이블에 저장 (에러가 안나올 경우)
    return true;
  } catch (err) {
    console.error(err);
    transaction.rollback();
    return false;
  }
};
