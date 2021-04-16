const zingAPI = require("zingmp3.vn-api");

module.exports.getTop100 = async (req, res) => {
  const data = await zingAPI.getTop100();
  if (data) {
    return res.json({
      status: "success",
      doc: data,
    });
  }
};

module.exports.getPlayList = async (req, res) => {
  const { id } = req.params;

  const playList = await zingAPI.getDetailPlaylist(id);
  if (playList) {
    return res.json({
      status: "success",
      doc: playList.song.items,
    });
  }

  return res.json({
    status: "error",
  });
};
