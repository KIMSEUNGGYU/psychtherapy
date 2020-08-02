const router = require("express").Router();
const BASEURL = "/api/v1";

const middleware = require("../middlewares");
const user = require("./user");
const partner = require("./partner");
const admin = require("./admin");
const keyword = require("./keyword");
const point = require("./point");
const schedule = require("./schedule");

router.use(`${BASEURL}/`, middleware.cors);
router.use(`${BASEURL}/user`, user);
router.use(`${BASEURL}/partner`, partner);
router.use(`${BASEURL}/admin`, admin);
router.use(`${BASEURL}/keyword`, keyword);
router.use(`${BASEURL}/point`, point);
router.use(`${BASEURL}/schedule`, schedule);

module.exports = router;
