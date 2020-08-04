const { cors } = require("./cors");
const auth = require("./auth");
const { errorHandling } = require("./errorhandling");

module.exports = {
  cors,
  apiKeyAuth: auth.apiKeyAuth,
  errorHandling,
};
