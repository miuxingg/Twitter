const express = require("express");
const Route = express.Router();
const { postImage, getImage } = require("../controllers/imageController");
Route.route("/").post(postImage).get(getImage);

module.exports = Route;
