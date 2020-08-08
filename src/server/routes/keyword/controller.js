const service = require("./service");
const view = require("./view");

exports.keyword = async (req, res, next) => {
  const keywords = await service.getKeywords();

  try {
    keywords.length
      ? res.status(200).json(view.keywords(keywords))
      : res.status(204).json(view.empty());
  } catch (err) {
    res.status(400).json(view.badRequest());
  }
};
