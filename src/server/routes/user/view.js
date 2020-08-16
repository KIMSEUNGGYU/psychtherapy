// COMMON
exports.badRequset = () => ({ message: "Bad Request", result: {} });
exports.empty = () => ({ message: "Empty Object", result: {} });

// email validation view
exports.emailAvailable = () => ({ message: "success", result: {} });
exports.emailNotAvailable = () => ({
  message: "ResourceConflict - 이미 존재하는 데이터 입니다",
  result: {},
});

// user signup
exports.createUser = () => ({ message: "Created Success", result: {} });
exports.createUserFail = () => ({ message: "Created Fail", result: {} });

// user signin
exports.signin = (accessToken, refreshToken) => ({
  message: "Success",
  result: { accessToken, refreshToken },
});
exports.signinFail = () => ({ message: "Unauthorized", result: {} });

// user signout
exports.deleteRefreshToken = () => ({ message: "Sucess", result: {} });
exports.deleteRefreshTokenFail = () => ({ message: "No content", result: {} });

// user Detail
exports.userDetail = (user, schedules) => ({
  message: "Success",
  result: { ...user, schedules },
});
