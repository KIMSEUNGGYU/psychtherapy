const router = require("express").Router();

const controller = require("./controller");

router.put("/refresh", controller.refreshToken);

module.exports = router;
