const mongoose = require("mongoose");

const Users = mongoose.model(
  "user",
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    gender: String,
    isVIP: Boolean,
    playlist: Array,
  },
  "users"
);

module.exports = Users;
