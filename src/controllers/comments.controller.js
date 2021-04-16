const Comments = require("../models/comments.model");
const Users = require("../models/users.model");
const axios = require("axios");

module.exports.getComments = async (req, res) => {
  const comments = await Comments.find({});
  if (comments) {
    return res.status(200).json({
      isSuccess: true,
      data: comments,
    });
  }
};

module.exports.getCommentById = async (req, res) => {
  const { song_id } = req.params;
  const comment = await Comments.findOne({ song_id });
  if (comment) {
    return res.status(200).json({
      isSuccess: true,
      data: comment,
    });
  }

  return res.json({
    isSuccess: false,
    msg: "Không tìm thấy.",
  });
};

module.exports.createComment = async (req, res) => {
  const { song_id, sender_id, content } = req.body;

  const comment = await Comments.findOne({ song_id });
  if (comment) {
    return res.status(500).json({
      isSuccess: false,
      msg: "Đã tồn tại.",
    });
  }

  const user = await Users.findOne({ _id: sender_id });
  if (!user) {
    return res.json({
      isSuccess: false,
      msg: "Không tìm thấy User.",
    });
  }

  const song = await axios
    .get(`http://localhost:3001/mp3/${song_id}`)
    .then((res) => res.data);
  if (song.status === "error") {
    return res.json({
      isSuccess: false,
      msg: "Không tìm thấy Song.",
    });
  }

  let newComment;
  if (content.length > 0) {
    newComment = new Comments({
      song_id,
      room: {
        name: song.title,
        artists: song.artistsNames,
      },
      comments: [
        {
          sender: {
            name: `${user.firstName} ${user.lastName}`,
            id: user._id,
          },

          content,
        },
      ],
    });
  } else {
    newComment = new Comments({
      song_id,
      room: {
        name: song.doc.title,
        artists: song.doc.artistsNames,
      },
      comments: [],
    });
  }

  await newComment.save();
  return res.status(200).json({
    isSuccess: true,
    data: newComment,
  });
};

module.exports.updateCommentById = async (req, res) => {
  const { song_id } = req.params;
  const { senderId, content } = req.body;

  const comment = await Comments.findOne({ song_id });
  if (!comment) {
    return res.json({
      isSuccess: false,
      msg: "Không tìm thấy.",
    });
  }

  const user = await Users.findOne({ _id: senderId });
  if (!user) {
    return res.json({
      isSuccess: false,
      msg: "Không tìm thấy User.",
    });
  }

  comment.comments.push({
    sender: {
      name: `${user.firstName} ${user.lastName}`,
      id: user._id,
    },
    content,
  });
  await comment.save();

  return res.status(200).json({
    isSuccess: true,
    data: comment,
  });
};
