const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

// const emailRegExp = ^([A-Za-z]|[0-9])+$;
// const emailRegExp = "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])";
// const emailRegExp = /(.+)@(.+){2,}\.(.+){2,}/;
// password: Joi.string().pattern(emailRegExp).required()

const userSchema = Joi.object({
  // name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateBody = (req, res, schema = contactSchema) => {
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(404).json({ message: result.error.message });
  }
};

const validateUser = (req, res, schema = userSchema) => {
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({ message: result.error.message });
  }
};

module.exports = {
  validateBody,
  validateUser,
};
