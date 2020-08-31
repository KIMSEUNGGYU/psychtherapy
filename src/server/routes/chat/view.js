exports.success = content => ({ message: "Success", result: { content } });
exports.empty = () => ({ message: "Empty Object", result: {} });
exports.badRequest = () => ({ mesage: "Bad Request", result: {} });
