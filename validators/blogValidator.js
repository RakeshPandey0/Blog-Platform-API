const { body } = require("express-validator");

const validateBlog = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of strings"),
];

module.exports = {
  validateBlog,
};
