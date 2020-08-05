const service = require("./service");

exports.keyword = async (req, res, next) => {
  const keywords = await service.getKeywords();

  try {
    keywords.length
      ? res.status(200).json({
          mesage: "Success",
          result: { keyword: keywords },
        })
      : res.status(204).json({ mesage: "Empty Object", result: {} });
  } catch (err) {
    res.status(400).json({ mesage: "Bad Request", result: {} });
  }
};
