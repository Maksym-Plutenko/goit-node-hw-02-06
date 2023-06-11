const User = require("./schemas/users");

const register = async (req) => {
  return User.create(req.body);
};

const findUserByEmail = async (email) => {
  return User.findOne({
    email,
  });
};

const getToken = async (id, token) => {
  return User.findByIdAndUpdate(id, {token}, {new: true});
};

const removeToken = async (id, token) => {
  
};

module.exports = {
  register,
  findUserByEmail,
  getToken,
  removeToken
};
