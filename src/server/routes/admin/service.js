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

exports.uploadImageFile = (partnerId, image) => {
  let buf = new Buffer(image.replace(/^data:image\/\w+;base64,/, ""), "base64");
  let bucketName = "be-simple";
  let phase = "dev";
  let fileName = "test.jpg";
  param = {
    Bucket: bucketName,
    Key: `${phase}/${fileName}`,
    ContentEncoding: "base64",
    Body: buf,
    ACL: "public-read",
    ContentType: "image/jpeg",
  };
  s3.upload(param, (err, data) => {
    if (err) console.log(err);
    return data.Location;
  });
};

exports.updatePartnerDetail = async (partnerId, partner) => {
  console.log("partner.image: ", partner.image);
  if (partner.image) {
    let image_url = await this.uploadImageFile(paratnerId, partner.image);
    console.log("image_url: ", image_url);
    partner.image = image_url;
  }
  console.log("partner.image: ", partner.image);
  const result = await models.partnerDetails.updatePartner(partnerId, partner);
  return result[0]; // query 결과가 배열로 반환됨.
};
