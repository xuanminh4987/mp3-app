const mongoose = require("mongoose");

const Comments = mongoose.model(
  "comment",
  {
    song_id: String,
    room: {
      name: String,
      artists: String,
    },
    comments: Array,
  },
  "comments"
);

module.exports = Comments;
