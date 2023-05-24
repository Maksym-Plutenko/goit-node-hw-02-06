const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

function validate(object) {
  const res = schema.validate(object);
  console.log(res);
  return res.error || null;
}

module.exports = {
  validate,
};
