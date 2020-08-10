const service = require("./service");
const view = require("./view");

exports.partners = async (req, res, next) => {
  const query = req.query;

  const partners = await service.getPartnerList(query);

  if (!partners) {
    return res.status(400).json(view.badRequest());
  }

  return partners.length
    ? res.status(200).json(view.partnerList(partners))
    : res.status(204).json(view.empty());
};

exports.signup = async (req, res, next) => {
  const user = req.body;

  const success = await service.generatePartner(user);

  return success
    ? res.status(201).json(view.partnerSignupSuccess())
    : res.status(200).json(view.partnerSignupError());
};

exports.detail = async (req, res, next) => {
  const partnerId = req.params["partnerId"];

  const partner = await service.getPartner(partnerId);

  if (partner === false) {
    return res.status(400).json(view.badRequest());
  }

  return partner
    ? res.status(200).json(view.partnerDetail(partner))
    : res.status(204).json(view.empty());
};
