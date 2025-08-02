const { Router } = require("express");
const router = Router();

const requireLogin = require("../middleware/auth.middleware");
const {
  addComment,
  deleteComment,
  updateComment,
  getComments,
} = require("../controllers/comment.controller");

router.post("/:blogId", requireLogin, addComment);
router.get("/:blogId", requireLogin, getComments);
router.patch("/:id", requireLogin, updateComment);
router.delete("/:id", requireLogin, deleteComment);

module.exports = router;
