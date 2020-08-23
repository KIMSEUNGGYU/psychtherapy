exports.partnerList = (partners, totalCount) => ({
  message: "message",
  result: { partners, totalCount },
});
exports.partnerSignupSuccess = () => ({ message: "Success", result: {} });
exports.partnerSignupError = () => ({ message: "Fail", result: {} });
exports.partnerDetail = partner => ({
  message: "Empty Object",
  result: { partner },
});
exports.empty = () => ({ message: "Empty Object", result: {} });
exports.badRequest = () => ({ message: "Bad Request", result: {} });
