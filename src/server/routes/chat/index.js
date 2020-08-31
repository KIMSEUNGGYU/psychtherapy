const router = require("express").Router();

const controller = require("./controller");

router.get("/", controller.getContentByRoomId);

module.exports = router;
