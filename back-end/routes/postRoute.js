const { Router } = require("express");
const express = require("express");
const Route = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  getAllPost,
  createOnePost,
  updateOnePost,
  deleteOnePost,
} = require("../controllers/postController");

Route.route("/").get(getAllPost).post(verifyToken, createOnePost);

Route.route("/:postId")
  .put(verifyToken, updateOnePost)
  .delete(verifyToken, deleteOnePost);

module.exports = Route;
