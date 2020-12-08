const router = require("express").Router();

const controller = require("./controller");

router.get("/:partnerId/:day", controller.getPartnerSchedules);
router.post("/partner", controller.setPartnerSchedules);
router.delete("/partner", controller.deletePartnerSchedules);

module.exports = router;
