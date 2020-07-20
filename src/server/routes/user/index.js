const router = require("express").Router();

const controller = require("./controller");

router.get("/detail", controller.detail); // /user/detail/{userId}
router.get("/check", controller.check); // /user/check
router.post("/signup", controller.signup); // /user/signup
router.post("/signin", controller.signin); // /user/signin
router.post("/signout", controller.signout); // /user/signout

module.exports = router;
