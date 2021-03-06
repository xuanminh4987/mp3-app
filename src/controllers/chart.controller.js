const zingAPI = require("zingmp3.vn-api");

module.exports.getChart = async (req, res) => {
  const data = await zingAPI.getChart();
  if (data) {
    return res.json({
      status: "success",
      doc: data,
    });
  }
};
