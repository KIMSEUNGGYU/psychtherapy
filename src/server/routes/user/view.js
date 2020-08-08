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
exports.emailNotAvailable = () => ({ message: "fail", result: {} });

exports.signup = () => {
  // 유저 회원가입
  return {
    message: "user signup",
    result: {},
  };
};

exports.signin = () => {
  // 유저 로그인
  return {
    message: "user signin",
    result: {},
  };
};

exports.signout = () => {
  return {
    message: "user signout",
    result: {},
  };
};
