const models = require("../../db/models");
const jwt = require("../../library/jwt");

exports.verifyRefreshToken = async refreshToken =>
  await jwt.verify(refreshToken, false);

exports.updateAccessToken = async (payload, refreshToken) => {
  //   const { userId } = jwt.verify(refreshToken, false);

  //   if (!userId) return false; // userId 가 없으면 verify 실패

  //   const payload = {
  //     userId,
  //   };
  const accessToken = await jwt.generateAccessToken(payload);

  const success = await models.tokens.updateAccessToken(
    refreshToken,
    accessToken,
  );

  return success ? accessToken : false;
};
