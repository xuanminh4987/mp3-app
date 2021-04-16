const users = [];

module.exports.addUser = (userParams) => {
  const user = users.find((user) => user._id === userParams._id);
  if (user) return { error: "User đã tồn tại." };

  users.push(userParams);
  return userParams;
};

module.exports.getUser = (id) => users.find((user) => user._id === id);

module.exports.getUsers = () => users;

module.exports.removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index !== -1) {
    const removedUser = users[index];
    users.splice(index, 1);
    return removedUser;
  }

  return null;
};
