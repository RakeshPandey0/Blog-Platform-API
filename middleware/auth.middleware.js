const { validateToken } = require("../services/auth.service");

function requireLogin(req, res, next) {
  //authorization with bearer token
  const authHeader = req.headers["authorization"];

  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  req.user = validateToken(token);
  next();
}

module.exports = requireLogin;
