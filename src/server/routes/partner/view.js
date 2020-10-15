exports.partnerList = (partners, totalCount) => ({
  message: "message",
  result: { partners, totalCount },
});
exports.partnerSignupSuccess = () => ({ message: "Success", result: {} });
exports.partnerSignupError = () => ({ message: "Fail", result: {} });
exports.partnerDetail = (partner, schedules) => ({
  message: "Success",
  result: { partner, schedules },
});
exports.userInfo = (userInfo) => ({ userInfo })
exports.empty = () => ({ message: "Empty Object", result: {} });
exports.badRequest = () => ({ message: "Bad Request", result: {} });
