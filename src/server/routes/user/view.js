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

exports.check = () => {
  return {
    message: "user check",
    result: {},
  };
};

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
