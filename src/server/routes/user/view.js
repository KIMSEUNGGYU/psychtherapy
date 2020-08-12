// COMMON
exports.badRequset = () => ({ message: "Bad Request", result: {} });

exports.detail = () => {
  return {
    message: "user detail",
    result: {
      email: "user@example.com",
      name: "gyu",
      birth: "2020-07-13",
      phone: "010-1234-5678",
      gender: 0,
    },
  };
};

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
