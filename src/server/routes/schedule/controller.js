const service = require("./service");

exports.get = async (req, res, next) => {
  const partnerId = req.params["partnerId"];
  const schedules = await service.getSchedules(partnerId);

  schedules
    ? res.status(200).json({ message: "Success", result: { schedules } })
    : res.status(400).json({ message: "Bad Request", result: {} });
};

exports.partner = async (req, res, next) => {
  const { partnerId, schedules } = req.body;
  const success = await service.createSchedules(partnerId, schedules);

  success
    ? res.status(200).json({ message: "Success", result: {} })
    : res.status(400).json({ message: "Bad Request", result: {} });
};
