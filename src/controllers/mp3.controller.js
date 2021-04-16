const fetch = require("node-fetch");
const zingAPI = require("zingmp3.vn-api");

module.exports.getMP3sInfo = async (req, res) => {
  const { query } = req.body;
  const num = 3;
  const url = `https://ac.global.mp3.zing.vn/complete/desktop?type=song&num=${num}&query=${query}`;

  const data = await fetch(url).then((res) => res.json());

  if (data.result && data.data.length > 0) {
    return res.json({
      status: "success",
      doc: data.data,
    });
  }

  return res.json({
    data: {
      status: "error",
    },
  });
};

module.exports.getMP3FullInfo = async (req, res) => {
  const { id } = req.params;
  const data = await zingAPI.getFullInfo(id);

  if (data) {
    return res.json({
      status: "success",
      doc: {
        ...data,
        streaming: {
          ...data.streaming,
          320: `http://api.mp3.zing.vn/api/streaming/audio/${id}/320`,
        },
      },
    });
  }

  return res.json({
    data: {
      result: false,
    },
  });
};
