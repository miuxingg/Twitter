const express = require("express");
const Route = express.Router();
const {
  login,
  register,
  getCurrnetUser,
} = require("../controllers/authController");
const { checkCurrentUser } = require("../middlewares/checkCurrent");
Route.route("/register").post(register);
Route.route("/login").post(login);
Route.route("/").get(checkCurrentUser, getCurrnetUser);

module.exports = Route;
