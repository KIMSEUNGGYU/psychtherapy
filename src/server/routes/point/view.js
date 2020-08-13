exports.badRequest = () => ({ message: "Bad Request", result: {} });
exports.unauthorized = () => ({ message: "Unauthorized", result: {} });

// /charge
exports.charge = () => ({ message: "Updated Success", result: {} });
exports.chargeFail = () => ({ message: "Updated Fail", result: {} });

// /purchase
exports.purchase = () => ({ message: "Updated Success", result: {} });
exports.purchaseFail = () => ({ message: "Updated Fail", result: {} });
