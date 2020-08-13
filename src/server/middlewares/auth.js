const { MESSAGE } = require("../library/constant");
const jwt = require("../library/jwt");

exports.apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey && apiKey === process.env.X_API_KEY) return next();
  return next(new Error(MESSAGE.ERROR_API_KEY));
};

exports.jwtAuth = async (req, res, next) => {
  const accessToken = req.headers["x-access-token"];
  const admin = req.originalUrl.split("/")[3];

  const user = await jwt.verify(accessToken, (access = true));

  // admin url 은 amin 권한이 있는 사람만 수행
  if (admin === "admin" && user.type !== 99)
    return next(new Error("JWT ERROR"));

  if (!user) return next(new Error("JWT ERROR")); // jwt 가 만료되거나 admin 계정이 아닌 경우

  // 해당 미들웨어 외, 다른 라우터에서 사용하기 위해 사용
  res.locals.userId = user.userId;
  return next();
};
