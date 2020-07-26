const service = require("./service");

exports.keyword = async (req, res, next) => {
  const keywords = await service.getKeywords();

  keywords.length
    ? res.status(200).json({
        mesage: "KEYWORD LIST",
        result: { keyword: keywords },
      })
    : res
        .status(200)
        .json({ mesage: "KEYWORD LIST FAIL - IT DOSEN'T EXIST", result: {} });

  // 있어도 없어도 200
  // 없을 경우 204 괜찮을 듯!! <- 수신을 했지만 컨텐츠 없음
  // 400(api), 401,
};
