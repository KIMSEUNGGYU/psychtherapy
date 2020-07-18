const view = require("./view");
const service = require("./service");

// 컨트롤러에서 제어함!
// service 부분
// db 부분 <- 와도 됨
// view 부분

// /user/detail/{userId}
exports.detail = (req, res, next) => {
  res.status(200).json(view.detail());
};

exports.check = (req, res, next) => {
  res.status(200).json(view.check());
};

exports.signup = (req, res, next) => {
  res.status(200).json(view.signup());
};

exports.signin = (req, res, next) => {
  res.json(view.signin());
};

exports.signout = (req, res, next) => {
  res.status(200).json(view.signout());
};
