const joi = require('joi');

// schema options
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const taskSchema = joi.object({
  name: joi.string().trim().required(),
  description: joi.string().trim().required(),
});

function createTaskValidation(req, res, next) {
  const { error, value } = taskSchema.validate(req.body, options);

  if (error) {
    // on fail return comma separated errors
    return res
      .status(400)
      .send(
        `Validation error: ${error.details.map((x) => x.message).join(', ')}`
      );
  }

  // on success replace req.body with validated value and trigger next middleware function
  req.body = value;
  next();
}

module.exports = { createTaskValidation };
