exports.keywords = keywords => ({
  message: "Success github action test",
  result: { keywords },
});
exports.empty = () => ({ message: "Empty Object", result: {} });
exports.badRequest = () => ({ mesage: "Bad Request", result: {} });
