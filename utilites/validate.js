const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const userSchema = Joi.object({
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
