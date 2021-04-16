const zingAPI = require("zingmp3-api");

module.exports.getHub = async (req, res) => {
  const hub = await zingAPI.getHub();
  if (hub) {
    return res.json({
      status: "success",
      doc: hub,
    });
  }

  return res.json({
    status: "error",
  });
};

module.exports.getHubByID = async (req, res) => {
  const { id } = req.params;
  const hub = await zingAPI.getHubByID(id);
  if (hub) {
    return res.json({
      status: "success",
      doc: hub,
    });
  }

  return res.json({
    status: "error",
  });
};
