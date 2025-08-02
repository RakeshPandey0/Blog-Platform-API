const jwt = require("jsonwebtoken");
require("dotenv").config();

function createUserToken(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });
}

function validateToken(token) {
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

module.exports = {
  createUserToken,
  validateToken,
};
