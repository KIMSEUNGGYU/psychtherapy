exports.success = () => ({ message: "Success", result: {} });
exports.scheduleList = schedules => ({
  message: "Success",
  result: { schedules },
});

exports.badRequest = () => ({ message: "Bad Request", result: {} });
exports.empty = () => ({ message: "Empty Object", result: {} });

exports.NotPartnerUser = () => ({
  message: "This Partner Id Is Not Partner User",
  result: {},
});
