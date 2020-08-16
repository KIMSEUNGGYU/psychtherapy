const router = require("express").Router();

const middleware = require("../../middlewares");
const controller = require("./controller");

router.get("/email/validate", controller.check); // /user/check
router.post("/signup", controller.signup); // /user/signup
router.post("/signin", controller.signin); // /user/signin
router.delete("/signout", controller.signout); // /user/signout

router.get("/detail", middleware.jwtAuth, controller.detail); // /user/detail

module.exports = router;
