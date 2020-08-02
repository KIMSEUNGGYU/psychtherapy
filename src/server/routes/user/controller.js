const view = require("./view");
const service = require("./service");

exports.signup = async (req, res, next) => {
  const user = req.body;
  const result = await service.userSignup(user);
  result
    ? res.status(201).json({ message: "Created Success", result: {} })
    : res.status(400).json({ message: "Created Fail", result: {} });

  // 400, 401 에러
  // 401 은 middleware api key error
};

exports.signin = async (req, res, next) => {
  const user = req.body;
  const result = await service.signin(user);

  result
    ? res.status(200).json({
        message: "Signin Success",
        result: { accessToken: "accessToken", refreshToken: "refreshToken" },
      })
    : res.status(400).json({ message: "Signin Fail", result: {} });

  // 400 : 비밀번호 틀림, 이메일 존재 하지 않음. (비지니스 로직에 문제 있는 경우)
  // 401 : api key 에 해당하는 문제가 있는 경우
};

exports.signout = async (req, res, next) => {
  res.status(200).json(view.signout());
};

// /user/detail/{userId}
exports.detail = async (req, res, next) => {
  res.status(200).json(view.detail());
};

exports.check = async (req, res, next) => {
  const email = req.query["email"];
  // console.log("email", email);
  const result = await service.emailCheck(email);

  console.log("result", result);
  // 데이터가 있으면 result 값이 있음.
  // 나중에 service.emailCheck [Op.ne] 사용
  result
    ? res
        .status(409)
        .json({ message: "resource Conflict -  Email duplicates", result: {} }) // 리소스 충돌 409
    : res.status(200).json(view.check());
};
