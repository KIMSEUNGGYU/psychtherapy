const jwt = require("jsonwebtoken");
const config = require("../config/jwt");

// accessToken, refreshToken 생성
exports.generateTokens = async payload => {
  const accessToken = await generateTokens(payload);
  const refreshToken = await jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    config.jwt.refreshToken,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// accessToken 검증
exports.verify = async (accessToken, access = true) => {
  try {
    const user = await jwt.verify(
      accessToken,
      access
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET,
    );
    return user;
  } catch (error) {
    console.error("JWT VERIFY ERROR", error);
    return false;
  }
};

// refreshToken 을 활용하여 accessToken 갱신
exports.refresh = async refreshToken => {
  try {
    const user = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
    const payload = {
      userId: user.userId,
    };
    const accessToken = generateTokens(payload);

    return accessToken;
  } catch (error) {
    console.error("JWT REFRESH ERROR", error);
  }
};

exports.generateAccessToken = async payload => {
  return await jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    config.jwt.accessToken,
  );
};

const generateTokens = async payload => {
  return await jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    config.jwt.accessToken,
  );
};
