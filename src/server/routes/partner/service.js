const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");

exports.getPartners = async query => {
  const { gender, level, certificate, keyword } = query; // condition
  const condition = {
    gender,
  };

  const partners = await models.partnerDetails.getPartners(condition, models);
  return partners;
};

exports.generatePartner = async user => {
  user.type = 1; // partner
  user.evaluate = 0; // 파트너 초반 가입은 평가를 받아야함
  const {
    email,
    password,
    name,
    phoneNumber,
    gender,
    age,
    type,
    evaluate,
  } = user;

  let transaction;
  try {
    transaction = await sequelize.transaction(); // 트랜잭션 생성
    const { id } = await models.users.signup(
      email,
      password,
      type,
      transaction,
    ); // users 테이블에 데이터를 넣고, 해당 id 값 가져옴
    await models.partnerDetails.signup(
      id,
      name,
      age,
      phoneNumber,
      gender,
      evaluate,
      transaction,
    ); // usersDetails 테이블에 데이터를 삽입
    transaction.commit(); // 각 테이블에 저장 (에러가 안나올 경우)
    return true;
  } catch (err) {
    console.error(err);
    transaction.rollback();
    return false;
  }
};

exports.getPartner = async partnerId => {
  const condition = { partnerId };
  const result = await models.partnerDetails.getPartner(condition, models);
  return result;
  // id, email 로 순서 맞추기 위해서 넣은 코드 <- 사용할까 말까 고민중
  // const { id, email, ...detail } = result;
  // const partner = {
  //   id,
  //   email,
  //   ...detail,
  // };
  // return partner;
};
