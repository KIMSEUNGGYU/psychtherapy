const partnerService = require("../partner/service");
const service = require("./service");
const view = require("./view");

exports.getPartnerSchedules = async (req, res, next) => {
  const partnerId = req.params["partnerId"];
  const date = req.params["date"];
  if (!partnerId) return res.status(400).json(view.badRequest());

  const success = await service.getSchedulesByPartnerIdDate(partnerId, date);
  console.log(`success : ${success}`);
  if (!success) return res.status(400).json(view.badRequest());

  success.length
    ? res.status(200).json(view.scheduleList(success))
    : res.status(204).json(view.empty());
};

exports.setPartnerSchedules = async (req, res, next) => {
  const { partnerId, schedules } = req.body;
  if (!partnerId || !schedules) return res.status(400).json(view.badRequest());

  const isPartner = await partnerService.isPartnerUser(partnerId);
  if (!isPartner) return res.status(400).json(view.NotPartnerUser());

  const success = await service.createSchedules(partnerId, schedules);
  if (!success) return res.status(400).json(view.badRequest());

  success
    ? res.status(200).json({ message: "Success", result: {} })
    : res.status(400).json({ message: "Bad Request", result: {} });
};
