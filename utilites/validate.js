const Joi = require("joi");

const validatioSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const validateBody = (req, res, schema = validatioSchema) => {
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(404).json({ message: result.error.message });
  }
};

module.exports = {
  validateBody,
};
