const service = require("./service");

exports.partners = async (req, res, next) => {
  const query = req.query;

  const partners = await service.getPartners(query);

  partners.length
    ? res.status(200).json({
        message: "PARTNER LIST",
        result: { partners, totalCount: partners.length },
      })
    : res.status(200).json({
        message: "PARTNER LIST - IT DOSEN'T EXIST",
        result: {},
      });
};

exports.signup = async (req, res, next) => {
  const user = req.body;

  const success = await service.generatePartner(user);

  success
    ? res.status(201).json({ message: "PARTNER CREATE SUCCESS", result: {} })
    : res.status(200).json({ message: "PARTNER CREATE FAIL", result: {} });
};

exports.detail = async (req, res, next) => {
  const partnerId = req.params["partnerId"];

  const partner = await service.getPartner(partnerId);

  partner
    ? res
        .status(200)
        .json({ message: "GET PARTNER INFO ", result: { partner } })
    : res.status(200).json({
        message: "GET PARTNER INFO - IT DOSEN'T EXIST",
        result: {},
      });
};
