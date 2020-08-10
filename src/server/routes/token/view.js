// COMMON
exports.badRequset = () => ({ message: "Bad Request", result: {} });
exports.authFail = () => ({ message: "Unauthorized", result: {} });

// token/refresh
exports.updateSucess = (accessToken, refreshToken) => ({
  message: "Success",
  result: {
    accessToken,
    refreshToken,
  },
});
exports.updateFail = () => ({ message: "Update Token Fail", result: {} });
