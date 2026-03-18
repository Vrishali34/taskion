// validators/taskValidator.js
const Joi = require('joi');

// Schema for creating a task
const createTaskSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title cannot exceed 255 characters',
      'any.required': 'Title is required'
    })
});

// Schema for updating a task
const updateTaskSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(255)
    .optional()
    .messages({
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title cannot exceed 255 characters'
    }),

  completed: Joi.boolean()
    .optional()
    .messages({
      'boolean.base': 'Completed must be a boolean value (true or false)'
    })
});

module.exports = {
  createTaskSchema,
  updateTaskSchema
};