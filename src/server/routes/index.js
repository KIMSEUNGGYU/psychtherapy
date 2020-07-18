const router = require("express").Router();
const BASEURL = "/api/v1";

const user = require("./user");

router.use(`${BASEURL}/user`, user);

module.exports = router;
