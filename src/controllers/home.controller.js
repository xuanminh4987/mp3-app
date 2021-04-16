const zingAPI = require("zingmp3-api");

module.exports.getHome = async (req, res) => {
  const { page } = req.body;
  const data = await zingAPI.getHome(page);

  if (data) {
    return res.json({
      status: "success",
      doc: data,
    });
  }

  return res.json({
    status: "error",
  });
};
