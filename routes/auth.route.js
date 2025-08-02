const { Router } = require("express");
const router = Router();

const {
  handleSignup,
  handleSignin,
} = require("../controllers/auth.controller");
const {
  validateSignup,
  validateSignin,
} = require("../validators/userValidator");
router.post("/signup", validateSignup, handleSignup);
router.post("/signin", validateSignin, handleSignin);

module.exports = router;
