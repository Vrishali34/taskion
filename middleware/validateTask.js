const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().min(1).required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required"
  })
});

function validateTask(req, res, next) {
  const { error } = taskSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message
    });
  }

  next();
}

module.exports = validateTask;