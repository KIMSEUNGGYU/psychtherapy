const service = require("./service");
const view = require("./view");

exports.charge = async (req, res, next) => {
  const { userId, point } = req.body;

  if (!userId || !point) return res.status(400).json(view.badRequest());

  // 요청한 jwt 와 파라미터로 받은 userId 와 다른 경우
  if (res.locals.userId && res.locals.userId !== userId)
    return res.status(401).json(view.unauthorized());

  const success = await service.pointCharge(userId, point);

  success
    ? res.status(201).json(view.charge())
    : res.status(202).json(view.chargeFail());
};

exports.purchase = async (req, res, next) => {
  const { userId, point, partnerId, scheduleId } = req.body;

  if ((!userId || !point || !partnerId, !scheduleId))
    return res.status(400).json(view.badRequest());

  // 요청한 jwt 와 파라미터로 받은 userId 와 다른 경우
  if (res.locals.userId && res.locals.userId !== userId)
    return res.status(401).json(view.unauthorized());

  // 파트너한테 있는 스케쥴인지 확인 - 포함되어있지 않으면 null 반환
  const contain = await service.scheduleIdCotainPartnerId(
    scheduleId,
    partnerId,
  );
  if (!contain) return res.status(400).json(view.badRequest());

  // 스케쥴 정보 가져오기
  const { startedAt } = await service.getScheduleByScheduleId(scheduleId);
  const roomId = service.makeRoomId(userId, partnerId, startedAt);

  // 스케쥴 아이디에 이미 데이터가 존재하는 경우 변동되면 안됨! <- 얘는 취소할수도 있는 거아님? <- 취소하면 가능하게 해야함
  const _userId = await service.getUserIdBySchedule(scheduleId);
  if (_userId && _userId.userId) return res.status(400).json(view.badRequest());

  const success = await service.pointPurchase(
    userId,
    point,
    partnerId,
    roomId,
    scheduleId,
  );

  success
    ? res.status(201).json(view.purchase())
    : res.status(202).json(view.purchaseFail()); // 잔액이 부족한 경우?
};
