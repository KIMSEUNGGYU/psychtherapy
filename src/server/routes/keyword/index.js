const router = require("express").Router();

const controller = require("./controller");

router.get("/", controller.keyword);

module.exports = router;
