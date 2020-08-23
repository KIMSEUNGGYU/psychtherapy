const service = require("./service");
const view = require("./view");

exports.partners = async (req, res, next) => {
  const query = req.query;

  try {
    const condition = {};
    for (const [key, value] of Object.entries(query)) {
      if (value) {
        condition[key] = value;
      }
    }
    delete condition["page"];
    delete condition["size"];

    const { totalCount } = await service.partnerTotalCount(condition);
    const partners = await service.getPartnerList(query);

    if (!partners) return res.status(400).json(view.badRequest());

    return partners.length
      ? res.status(200).json(view.partnerList(partners, totalCount))
      : res.status(204).json(view.empty());
  } catch (err) {
    // console.error("/partner error", err);
    next(new Error("DB ERROR"));
  }
};

exports.signup = async (req, res, next) => {
  const body = req.body;
  // const user = req.body;

  const partner = await service.generatePartner(body);
  // const success = await service.generatePartner(user);
  if (!partner) return res.status(400).json(view.badRequest());
  return partner
    ? res.status(201).json(view.partnerSignupSuccess())
    : res.status(400).json(view.partnerSignupError());
};

exports.detail = async (req, res, next) => {
  const partnerId = req.params["partnerId"];

  const partner = await service.getPartner(partnerId);

  if (partner === false) return res.status(400).json(view.badRequest());

  return partner
    ? res.status(200).json(view.partnerDetail(partner))
    : res.status(204).json(view.empty());
};
