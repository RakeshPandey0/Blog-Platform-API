const { Router } = require("express");
const router = Router();

const {
  handleSignup,
  handleSignin,
} = require("../controllers/auth.controller");

router.post("/signup", handleSignup);
router.post("/signin", handleSignin);

module.exports = router;
