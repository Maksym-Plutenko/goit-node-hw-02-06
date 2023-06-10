const User = require("./schemas/users");

const register = async (req) => {
  return User.create(req.body);
};

const findUser = async (email) => {
  return User.findOne({
    email,
  });
};

module.exports = {
  register,
  findUser,
};
