exports.success = content => ({
  message: "Success",
  result: { contents: content },
});
exports.empty = () => ({ message: "Empty Object", result: {} });
exports.badRequest = () => ({ mesage: "Bad Request", result: {} });
