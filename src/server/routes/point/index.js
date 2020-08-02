const router = require("express").Router();

const controller = require("./controller");

router.put("/charge", controller.charge);
router.put("/purchase", controller.purchase);

module.exports = router;
