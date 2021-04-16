const zingAPI = require("zingmp3-api");

module.exports.getMVByID = async (req, res) => {
  const { id } = req.params;
  const mv = await zingAPI.getMVByID(id);

  if (mv) {
    return res.json({
      status: "success",
      doc: mv,
    });
  }

  return res.json({
    status: "error",
  });
};
