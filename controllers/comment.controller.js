const Comment = require("../models/Comment");

const getComments = async (req, res) => {
  const comments = await Comment.find({ blogId: req.params.blogId }).populate(
    "createdBy",
    "fullName email"
  );
  res.status(200).json({ msg: "Comments fetched", comments });
};

const addComment = async (req, res) => {
  try {
    await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });
    res.status(201).json({ msg: "Comment added" });
  } catch (error) {
    res.status(400).json({ msg: "Error adding comment", error });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });

    // Only owner or admin can delete
    const isOwner = comment.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ msg: "Unauthorized user" });
    }

    await comment.deleteOne();
    res.status(200).json({ msg: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { content } = req.body;

    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ msg: "Comment not found" });

    // Only owner or admin can delete
    const isOwner = comment.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ msg: "Unauthorized user" });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({ msg: "Comment updated", comment });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  addComment,
  deleteComment,
  updateComment,
  getComments,
};
