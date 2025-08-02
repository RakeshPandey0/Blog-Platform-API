const User = require("../models/User");
const { validationResult } = require("express-validator");

const handleSignup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.param,
        error: err.msg,
      })),
    });
  }

  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await User.create({ fullName, email, password, role });
    return res.status(201).json({ msg: "User created!", id: user._id });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const handleSignin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.param,
        error: err.msg,
      })),
    });
  }

  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Email and password required" });

    const token = await User.generateToken(email, password);
    return res.status(200).json({
      msg: "Signed in successfully!",
      token,
    });
  } catch (error) {
    console.log("signin error:", error);
    return res.status(401).json({ msg: error.message || "Unauthorized" });
  }
};

module.exports = {
  handleSignin,
  handleSignup,
};
