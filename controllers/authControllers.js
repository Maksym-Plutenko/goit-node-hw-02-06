const User = require("../models/schemas/users");

const register = async (req) => {
  return User.create(req.body);
};

const findUserByEmail = async (email) => {
  return User.findOne({
    email,
  });
};

const getToken = async (id, token) => {
  return User.findByIdAndUpdate(id, { token }, { new: true });
};

const findUserById = async (id) => {
  return User.findById(id);
};

const removeToken = async (id) => {
  return User.findByIdAndUpdate(id, { token: "" }, { new: true });
};

const updateAvatar = async (id, avatarURL) => {
  return User.findByIdAndUpdate(id, { avatarURL }, { new: true });
};

const findUserByToken = async (token) => {
  return User.findOne({
    verificationToken: token,
  });
};

const verifyEmail = async (id) => {
  return User.findByIdAndUpdate(
    id,
    { verify: true, verificationToken: "" },
    { new: true }
  );
};

module.exports = {
  register,
  findUserByEmail,
  getToken,
  findUserById,
  removeToken,
  updateAvatar,
  findUserByToken,
  verifyEmail,
};
