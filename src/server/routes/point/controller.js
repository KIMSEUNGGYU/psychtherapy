const service = require("./service");

exports.charge = async (req, res, next) => {
  const { userId, point } = req.body;
  const success = await service.pointCharge(userId, point);

  success
    ? res.status(201).json({ message: "Updated Success", result: {} })
    : res.status(400).json({ message: "Bad Request", result: {} });
};

exports.purchase = async (req, res, next) => {
  const { userId, point, partnerId, scheduleId } = req.body;
  const success = await service.pointPurchase(
    userId,
    point,
    partnerId,
    scheduleId,
  );

  success
    ? res.status(201).json({ message: "Updated Success", result: {} })
    : res.status(400).json({ message: "Bad Request", result: {} });
};
