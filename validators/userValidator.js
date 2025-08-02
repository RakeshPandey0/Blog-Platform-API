// validators/userValidator.js
const { body } = require("express-validator");

const validateSignup = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required"),

  body("email")
    .isEmail()
    .withMessage("A valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("role")
    .optional()
    .isIn(["USER", "ADMIN"])
    .withMessage("Role must be either USER or ADMIN"),
];

const validateSignin = [
  body("email")
    .isEmail()
    .withMessage("A valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

module.exports = {
  validateSignup,
  validateSignin,
};
