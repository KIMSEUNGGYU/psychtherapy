require("dotenv").config();

const sequelize = require("../../db/models").sequelize;
const models = require("../../db/models");
const AWS = require("aws-sdk");

exports.getUsers = async (page, size) => {
  const limit = size;
  const offset = (page - 1) * size;

  return await models.userDetails.getUsers(models, limit, offset);
};

exports.getPartners = async (page, size, evaluate) => {
  const limit = size;
  const offset = (page - 1) * size;

  const condition = { evaluate };

  const partners = await models.partnerDetails.getPartners(
    models,
    condition,
    limit,
    offset,
  );
  return partners;
};

exports.uploadImageFile = async (partnerId, image) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
  });

  const buf = Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64",
  );
  const bucketName = "be-simple";
  const phase = "dev";
  const fileName = `${partnerId}.jpg`;
  const param = {
    Bucket: bucketName,
    Key: `${phase}/${fileName}`,
    ContentEncoding: "base64",
    Body: buf,
    ACL: "public-read",
    ContentType: "image/jpeg",
  };

  try {
    const url = await new Promise((resolve, reject) => {
      s3.upload(param, (err, data) =>
        err == null ? resolve(data.Location) : reject(err),
      );
    });
    return url;
  } catch (err) {
    console.error("S3 ERROR", err);
    throw new Error("S3 ERROR");
  }
};

exports.updatePartnerDetail = async (partnerId, partner) => {
  partner["evaluate"] = 1; // 수정되면 1로 변환
  const result = await models.partnerDetails.updatePartner(partnerId, partner);
  return result[0]; // query 결과가 배열로 반환됨.
};

exports.validationUrl = image => {
  const urlPattern = /(http(s)?:\/\/)/gi; // 간단하게 http(s):// 인지 확인해서 url 인지 base64 인지 구분
  return urlPattern.test(image);
};

exports.userTotalCount = async () => {
  const totalCount = await models.userDetails.userTotalCount();
  return totalCount[0];
};

exports.partnerTotalCount = async () => {
  const totalCount = await models.partnerDetails.partnerTotalCount();
  return totalCount[0];
};
