const router = require("express").Router();

const controller = require("./controller");

router.get("/", controller.partners);
router.post("/signup", controller.signup);
router.get("/detail/:partnerId", controller.detail);

module.exports = router;
