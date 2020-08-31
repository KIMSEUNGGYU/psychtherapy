const service = require("./service");
const view = require("./view");

exports.getContentByRoomId = async (req, res, next) => {
  const roomId = req.query["roomId"];
  const contents = await service.getContentByRoomId(roomId);

  if (contents === false) {
    return res.status(400).json(view.badRequest());
  }

  contents
    ? res.status(200).json(view.success(contents))
    : res.status(204).json(view.empty());
};
