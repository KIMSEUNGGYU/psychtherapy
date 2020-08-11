const service = require("./service");
const view = require("./view");

exports.users = async (req, res, next) => {
  let { page, size } = req.query;
  page = parseInt(page);
  size = parseInt(size);

  if (!page || !size) return res.status(400).json(view.badRequset());
  if ((size && size > 100) || size < 0) size = 15;
  if (page === null || page <= 0) page = 1;

  try {
    const users = await service.getUsers(page, size);
    users.length
      ? res.status(200).json(view.getUsers(users))
      : res.status(204).json(view.empty());
  } catch (err) {
    // console.error("/admin/users error", err);
    next(new Error("DB ERROR"));
  }
};

exports.partners = async (req, res, next) => {
  let { page, size, evaluate } = req.query;
  page = parseInt(page);
  size = parseInt(size);

  if (!page || !size || !(evaluate === "true" || evaluate === "false"))
    return res.status(400).json(view.badRequset());

  evaluate = evaluate === "true" ? 1 : 0;

  try {
    const partners = await service.getPartners(page, size, evaluate);

    partners.length
      ? res.status(200).json(view.getPartners(partners))
      : res.status(204).json(view.empty());
  } catch (err) {
    // console.error("/admin/partners error", err);
    next(new Error("DB ERROR"));
  }
};

exports.partnerDetail = async (req, res, next) => {
  const partnerId = req.params["partnerId"];
  const partner = req.body;

  const success = await service.updatePartnerDetail(partnerId, partner); // 1 이면 수정 성공, 0 이면 수정 실패
  success
    ? res.status(201).json({ message: "UPDATE SUCCESS", result: {} }) // 정상 수행 (업데이트 성공)
    : res.status(202).json({ message: "UPDATE FAIL", result: {} }); // 요청은 됐지만 수정은 안됨

  // 201 은 정상적으로 변경이 될 경우
  // 202 는 서버가 수신은 했지만 처리되지 않음.
  // 204 는 내용이 같아 수정이 이루어지지 않을때
};
