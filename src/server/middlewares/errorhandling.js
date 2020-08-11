const { MESSAGE, STATUSCODE } = require("../library/constant");

exports.errorHandling = (err, req, res, next) => {
  console.log(err.message);
  switch (err.message) {
    case MESSAGE.ERROR_API_KEY:
      return res
        .status(STATUSCODE.ERROR_API_KEY)
        .json({ message: MESSAGE.ERROR_API_KEY });
    default:
      return res.status(STATUSCODE.ERROR_DEFAULT).json({
        message: err.message,
        result: {},
      });
  }
};
