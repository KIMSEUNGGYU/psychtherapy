const service = require("./service");

exports.users = async (req, res, next) => {
  const { page, size } = req.query;
  const users = await service.getUsers(page, size);

  users.length
    ? res.status(200).json({
        mesage: "USER LIST",
        result: { users, totalCount: users.length },
      })
    : res.status(200).json({ mesage: "USER LIST FAIL", result: {} });

  // 있어도 없어도 200
  // 400(api), 401, 403(토큰)
};

exports.partners = async (req, res, next) => {
  const { page, size, evaluate } = req.query;
  const partners = await service.getPartners(page, size, evaluate);

  partners.length
    ? res.status(200).json({
        mesage: "PARTNER LIST",
        result: { partners, totalCount: partners.length },
      })
    : res
        .status(400)
        .json({ mesage: "PARTNER LIST - IT DOSEN'T EXIST", result: {} });
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
