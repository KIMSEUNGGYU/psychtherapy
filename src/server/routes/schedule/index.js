const router = require("express").Router();

const controller = require("./controller");

router.get("/:partnerId", controller.get);
router.post("/partner", controller.partner);

module.exports = router;
