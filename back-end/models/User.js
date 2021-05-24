const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchame = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Name must be require"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email must be require"],
    },
    password: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Password must be require"],
      minlength: [6, "Password must be at 6 characters"],
    },
  },
  { timestamps: true }
);

userSchame.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, function (error, hash) {
    if (error) {
      return next(error);
    } else {
      user.password = hash;
      next();
    }
  });
});

const User = mongoose.model("Users", userSchame);
module.exports = User;
