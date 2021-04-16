const Users = require("../models/users.model");

module.exports.getUsers = async (req, res) => {
  const users = await Users.find({});
  if (users) {
    return res.status(200).json({
      isSuccess: true,
      userInfo: users,
    });
  }

  return res.json({
    isSuccess: false,
    msg: "Không tìm thấy.",
  });
};

module.exports.getUserById = async (req, res) => {
  const { _id } = req.params;

  const user = Users.findOne({ _id });
  if (user) {
    return res.status(200).json({
      isSuccess: true,
      userInfo: user,
    });
  }

  return res.json({
    isSuccess: false,
    msg: "Không tìm thấy.",
  });
};

module.exports.handleUser = async (req, res) => {
  const { type, userInfo } = req.body;

  if (type === "signin") {
    const { email, password } = userInfo;

    if (!email || !password) {
      return res.json({
        isSuccess: false,
        msg: "Điều thiếu.",
      });
    }

    const user = await Users.findOne({ email });
    if (user) {
      if (user.password === password) {
        return res.status(200).json({
          isSuccess: true,
          userInfo: user,
        });
      }

      return res.json({
        isSuccess: false,
        msg: "Mật khẩu không đúng.",
      });
    }

    return res.json({
      isSuccess: false,
      msg: "Tài khoản không tồn tại.",
    });
  }

  if (type === "signup") {
    const { firstName, lastName, email, password, gender } = userInfo;

    if (!firstName || !lastName || !email || !password || !gender) {
      return res.json({
        isSuccess: false,
        msg: "Điền thiếu.",
      });
    }

    const user = await Users.findOne({ email });
    if (user) {
      return res.json({
        isSuccess: false,
        msg: "Tài khoản đã tồn tại.",
      });
    }

    const newUser = new Users({
      ...userInfo,
      playlist: [],
      isVIP: false,
    });
    newUser.save();

    return res.status(200).json({
      isSuccess: true,
      userInfo: newUser,
    });
  }
};

module.exports.updateUser = async (req, res) => {
  const { _id } = req.params;
  const { songId, isAdd } = req.body;

  const user = await Users.findOne({ _id });
  if (user) {
    user.playlist.pull(songId);
    if (isAdd) {
      user.playlist.push(songId);
    }
    user.save();

    return res.status(200).json({
      isSuccess: true,
      data: user,
    });
  }

  return res.json({
    isSuccess: false,
    msg: "Tài khoản không tồn tại.",
  });
};
