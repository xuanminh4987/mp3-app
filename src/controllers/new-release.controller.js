const zingAPI = require("zingmp3.vn-api");

module.exports.getNewRelease = async (req, res) => {
  const data = await zingAPI.getNewRelease();
  if (data) {
    return res.json({
      status: "success",
      doc: data.items,
    });
  }
};
