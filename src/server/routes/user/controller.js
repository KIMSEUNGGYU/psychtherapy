const view = require("./view");
const service = require("./service");

exports.signup = async (req, res, next) => {
  const user = req.body;
  const { email, password, name, gender, age } = user;

  if (!(email && password && name && gender && age))
    return res.status(400).json(view.badRequset());

  const create = await service.userSignup(user);

  return create
    ? res.status(201).json(view.createUser())
    : res.status(400).json(view.createUserFail());
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  // 요청 파라미터 검증
  if (!(email && password)) return res.status(400).json(view.badRequset());

  const user = await service.signin(email, password);
  // 로그인 실패
  if (!user) return res.status(401).json(view.signinFail()); // email, 비밀번호 틀림

  // token 발행
  const payload = {
    userId: user.id,
    type: user.type,
  };
  const { accessToken, refreshToken } = await service.generateTokens(payload);

  return res.status(200).json(view.signin(accessToken, refreshToken));
};

exports.signout = async (req, res, next) => {
  const refreshToken = req.headers["x-refresh-token"];

  if (!refreshToken) return res.status(400).json(view.badRequset());

  const success = await service.deleteRefreshToken(refreshToken);

  success
    ? res.status(200).json(view.deleteRefreshToken())
    : res.status(404).json(view.deleteRefreshTokenFail());
};

exports.check = async (req, res, next) => {
  const email = req.query["email"];

  // email check 했는데 유저가 있으면 이메일 중복이므로 409
  const user = await service.emailCheck(email);

  return user
    ? res.status(409).json(view.emailNotAvailable()) // 리소스 충돌 409
    : res.status(200).json(view.emailAvailable());
};

exports.detail = async (req, res, next) => {
  let userId = null;
  let partnerId = null;
  if (req.query["userId"]) userId = req.query["userId"];
  else if (res.locals.userId) userId = res.locals.userId;
  if (req.query["partnerId"]) partnerId = req.query["partnerId"];
  if (userId === null) return res.status(400).json(view.badRequset()); // 이 부분은 필요 없을 수도..

  // user 정보를 가져옴
  const user = await service.getUserDetailPoint(userId);
  // 유저를 받았는데 관련된 유저가 없다면 잘못된 요청 (근데 거의 그럴 일이 없음)
  if (!user) return res.status(200).json(view.badRequset());

  // 해당 유저가 등록한 스케쥴 정보들을 보여줌
  const schedules = await service.getUserSchedule(userId,partnerId);
  return res.status(200).json(view.userDetail(user, schedules));
};
