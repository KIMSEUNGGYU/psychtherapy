const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");

exports.getContentByRoomId = async roomId => {
  try {
    const contents = [];
    const content = await models.messages.getContentByRoomId(roomId);

    if (content === null) return null;

    const jsonContent = JSON.parse(content.content);

    for (index of Object.keys(jsonContent)) {
      contents.push(jsonContent[index]);
    }
    return contents;
  } catch (e) {
    console.log(e);
    return false;
  }
};
