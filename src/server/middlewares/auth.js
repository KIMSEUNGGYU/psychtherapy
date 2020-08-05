const { MESSAGE } = require("../library/constant");

exports.apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey && apiKey === process.env.X_API_KEY) return next();
  return next(new Error(MESSAGE.ERROR_API_KEY));
};
