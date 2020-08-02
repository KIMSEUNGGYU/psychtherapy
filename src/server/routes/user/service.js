const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");

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
    console.error(err);
    transaction.rollback();
    return false;
  }
  // await
};

exports.signin = async user => {
  const { email, password } = user;
  return await models.users.signin(email, password);
};

exports.emailCheck = async email => {
  return await models.users.emailCheck(email);
};
