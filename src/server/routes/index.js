const router = require("express").Router();
const BASEURL = "/api/v1";

const middleware = require("../middlewares");
const user = require("./user");

router.use(`${BASEURL}/`, middleware.cors);
router.use(`${BASEURL}/user`, user);

module.exports = router;
