const router = require("express").Router();

const controller = require("./controller");

router.get("/:partnerId/:date", controller.getPartnerSchedules);
router.post("/partner", controller.setPartnerSchedules);
router.delete("/partner", controller.deletePartnerSchedules);
router.get("/note/room/:roomId", controller.getPartnerNote);
router.put("/note/room/:roomId", controller.putPartnerNote);

module.exports = router;
