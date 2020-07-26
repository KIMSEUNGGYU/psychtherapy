const router = require("express").Router();
const BASEURL = "/api/v1";

const middleware = require("../middlewares");
const user = require("./user");
const partner = require("./partner");

router.use(`${BASEURL}/`, middleware.cors);
router.use(`${BASEURL}/user`, user);
router.use(`${BASEURL}/partner`, partner);

module.exports = router;
