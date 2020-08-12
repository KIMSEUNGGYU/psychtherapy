exports.keywords = keywords => ({ message: "Success", result: { keywords } });
exports.empty = () => ({ message: "Empty Object", result: {} });
exports.badRequest = () => ({ mesage: "Bad Request", result: {} });
