const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller");

const { validateBlog } = require("../validators/blogValidator");
const requireLogin = require("../middleware/auth.middleware");

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", requireLogin, validateBlog, createBlog);
router.patch("/:id", requireLogin, updateBlog);
router.delete("/:id", requireLogin, deleteBlog);

module.exports = router;
