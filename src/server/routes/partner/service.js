const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");
const crypto = require("crypto");

exports.isPartnerUser = async (partnerId) => {
  try {
    const partner = await models.users.isUserPartner(partnerId);
    if (!partner) {
      throw new TypeError("Partner Type의 유저가 아닙니다.");
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

exports.getPartnerList = async (query) => {
  try {
    let condition = {};
    for (const [key, value] of Object.entries(query)) {
      if (value) {
        condition[key] = value;
      }
    }
    delete condition["page"];
    delete condition["size"];

    let page = query.page;
    let size = query.size;
    if ((query.size && query.size > 100) || !query.size) size = 15;
    if (query.page == null) page = 1;

    let limit = +size;
    let offset = (page - 1) * size;

    const partners = await models.partnerDetails.getPartners(
      models,
      condition,
      limit,
      offset
    );
    return partners;
  } catch (err) {
    return false;
  }
};

exports.generatePartner = async (body) => {
  body.type = 1; // partner
  body.evaluate = 0; // 파트너 초반 가입은 평가를 받아야함
  const {
    email,
    password,
    name,
    phoneNumber,
    gender,
    age,
    type,
    evaluate,
  } = body;

  let hashPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("base64");

  let transaction;
  try {
    transaction = await sequelize.transaction(); // 트랜잭션 생성
    const { id } = await models.users.signup(
      email,
      hashPassword,
      type,
      transaction
    ); // users 테이블에 데이터를 넣고, 해당 id 값 가져옴
    await models.partnerDetails.signup(
      id,
      name,
      age,
      phoneNumber,
      gender,
      evaluate,
      transaction
    ); // usersDetails 테이블에 데이터를 삽입
    await models.points.signup(id, transaction); // points 테이블에 데이터 삽입
    transaction.commit(); // 각 테이블에 저장 (에러가 안나올 경우)
    return true;
  } catch (err) {
    console.error(err);
    transaction.rollback();
    return false;
  }
};

exports.getPartner = async (partnerId) => {
  try {
    const condition = { partnerId };
    const result = await models.partnerDetails.getPartner(condition, models);
    return result;
  } catch (err) {
    return false;
  }
};

exports.partnerTotalCount = async (condition) => {
  const totalCount = await models.partnerDetails.partnerTotalCount(condition);
  return totalCount[0];
};

exports.getPartnerSchedule = async (partnerId) => {
  const condition = { partnerId };
  return await models.schedules.getSchedule(models, condition);
};