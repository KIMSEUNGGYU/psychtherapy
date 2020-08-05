const auth = require("./auth");
const { errorHandling } = require("./errorhandling");

module.exports = {
  apiKeyAuth: auth.apiKeyAuth,
  errorHandling,
};
