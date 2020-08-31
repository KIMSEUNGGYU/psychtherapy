const router = require("express").Router();
const cors = require("cors");

const middleware = require("../middlewares");
const user = require("./user");
const partner = require("./partner");
const admin = require("./admin");
const keyword = require("./keyword");
const point = require("./point");
const schedule = require("./schedule");
const token = require("./token");
const chat = require("./chat");
const { BASEURL } = require("../library/constant");

// middleware
router.use(`${BASEURL}/`, cors());
router.use(`${BASEURL}/`, middleware.apiKeyAuth);

// api
router.use(`${BASEURL}/user`, user);
router.use(`${BASEURL}/partner`, partner);
router.use(`${BASEURL}/keyword`, keyword);
router.use(`${BASEURL}/schedule`, schedule);
router.use(`${BASEURL}/token`, token);
router.use(`${BASEURL}/chat`, chat);
router.use(`${BASEURL}/admin`, middleware.jwtAuth, admin);
router.use(`${BASEURL}/point`, middleware.jwtAuth, point);

// error handling
router.use(`${BASEURL}/`, middleware.errorHandling);
module.exports = router;
