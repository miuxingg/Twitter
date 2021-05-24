const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.register = async (req, res, next) => {
  try {
    //req.body: name, email, pass
    const user = await User.create(req.body);
    //Tao token
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    res.status(200).json({
      status: "success",
      data: { token, userName: user.name },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    //kiem tra xem tai khoan co ton tai khong
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      //email is not correct
      const err = new Error("Email is not correct");
      err.statusCode = 400;
      return next(err);
    }
    //Kiem tra password nhap vao co dung k
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
      res.status(200).json({
        status: "success",
        data: {
          token,
          userName: user.name,
        },
      });
    } else {
      //password is not correct
      const err = new Error("Password is not correct");
      err.statusCode = 400;
      return next(err);
    }
  } catch (err) {
    next(err);
  }
};

//GET current User
exports.getCurrnetUser = async (req, res, next) => {
  try {
    const data = { user: null };
    if (req.user) {
      const user = await User.findOne({ _id: req.user.userId });
      data.user = { userName: user.name };
    }
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.json(err);
  }
};
