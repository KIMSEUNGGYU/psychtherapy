const service = require("./service");
const view = require("./view");

exports.refreshToken = async (req, res, next) => {
  const refreshToken = req.headers["x-refresh-token"];

  if (!refreshToken) return res.status(400).json(view.badRequset());

  // refreshToken verify
  const user = await service.verifyRefreshToken(refreshToken);
  if (!user) return res.status(401).json(view.authFail()); // user 가 없으면 verify 실패

  const payload = {
    userId: user.userId,
    type: user.type,
  };

  // update accessToken
  const accessToken = await service.updateAccessToken(payload, refreshToken);
  if (!accessToken) return res.status(400).json(view.updateFail());

  return res.status(201).json(view.updateSucess(accessToken, refreshToken));
};
