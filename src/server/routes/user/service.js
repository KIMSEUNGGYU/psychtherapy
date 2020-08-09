const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");
const jwt = require("../../library/jwt");

exports.userSignup = async user => {
  user.type = 0;
  const { email, password, name, age, gender, type } = user;

  let transaction;
  try {
    transaction = await sequelize.transaction(); // 트랜잭션 생성
    const { id } = await models.users.signup(
      email,
      password,
      type,
      transaction,
    ); // users 테이블에 데이터를 넣고, 해당 id 값 가져옴
    await models.userDetails.signup(id, name, age, gender, transaction); // usersDetails 테이블에 데이터를 삽입
    await models.points.signup(id, transaction);
    transaction.commit(); // 각 테이블에 저장 (에러가 안나올 경우)
    return true;
  } catch (err) {
    // console.error(err);
    transaction.rollback();
    return false;
  }
};

exports.signin = async (email, password) =>
  await models.users.signin(email, password);

exports.emailCheck = async email => await models.users.getUser(email);

// ############## JWT
// jwt 토큰 생성 및 db 에 저장
exports.generateTokens = async payload => {
  const { userId } = payload;

  const { accessToken, refreshToken } = await jwt.generateTokens(payload); // 토큰 생성
  await models.tokens.generateTokens(userId, accessToken, refreshToken); // db 에 토큰 저장

  return { accessToken, refreshToken };
};
