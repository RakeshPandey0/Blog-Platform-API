const Blog = require("../models/Blog");

// Create New blog
const createBlog = async (req, res) => {
  try {
    const { title, body, tags } = req.body;

    if (!title || !body) {
      return res.status(400).json({ msg: "Title and body are required" });
    }

    const blog = await Blog.create({
      title,
      body,
      tags,
      createdBy: req.user._id,
    });

    res.status(201).json({ msg: "Blog created", blog });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// All blogs
const getAllBlogs = async (req, res) => {
  try {
    const {
      search,
      tags,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (tags) {
      const tagArray = tags.split(",");
      filter.tags = { $in: tagArray };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOrder = order === "asc" ? 1 : -1;

    const blogs = await Blog.find(filter)
      .populate("createdBy", "fullName email")
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(filter);

    res.status(200).json({
      total,
      count: blogs.length,
      page: parseInt(page),
      blogs,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Blog by id
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "createdBy",
      "fullName email"
    );
    if (!blog) return res.status(404).json({ msg: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Update blog
const updateBlog = async (req, res) => {
  try {
    const { title, body, tags } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    console.log("user:", req.user);
    // Only owner or admin can update
    const isOwner = blog.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ msg: "Unauthorized user" });
    }

    blog.title = title ?? blog.title;
    blog.body = body ?? blog.body;
    blog.tags = tags ?? blog.tags;
    await blog.save();

    res.status(200).json({ msg: "Blog updated", blog });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    // Only owner or admin can delete
    const isOwner = blog.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ msg: "Unauthorized user" });
    }

    await blog.deleteOne();
    res.status(200).json({ msg: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
