const User = require("./schemas/users");

const register = async (req) => {
  return User.create(req.body);
};

module.exports = {
    register,
  
};