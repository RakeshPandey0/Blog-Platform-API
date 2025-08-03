const { Router } = require("express");
const router = Router();

const {
  handleSignup,
  handleSignin,
  removeUser,
  getAllUsers
} = require("../controllers/auth.controller");
const {
  validateSignup,
  validateSignin,
} = require("../validators/userValidator");
const requireLogin = require("../middleware/auth.middleware");

router.get("/", getAllUsers);
router.post("/signup", validateSignup, handleSignup);
router.post("/signin", validateSignin, handleSignin);
router.delete("/:id", requireLogin, removeUser);

module.exports = router;
