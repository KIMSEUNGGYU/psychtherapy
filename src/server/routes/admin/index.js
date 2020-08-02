const router = require("express").Router();

const controller = require("./controller");

router.get("/users", controller.users);
router.get("/partners", controller.partners);
router.put("/partner/:partnerId", controller.partnerDetail);

module.exports = router;
