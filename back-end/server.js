//dotenv
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.APP_PORT;
//import route
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const imageRoute = require("./routes/imageRoute");

//Cho phep front-end noi chuyen voi server (cors)
app.use(cors());

//Import errorHandle
const { errorHandler } = require("./middlewares/errorHandler");

//Body parser  => chuyen doi thong so nguoi dung de noi chuyen voi server
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//connect DB
const { connectDB } = require("./config/db");
connectDB();

//Mount the route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/image", imageRoute);

//Unhandled Route
app.all("*", (req, res, next) => {
  const err = new Error("The route can not be found");
  err.statusCode = 404;
  next(err);
});
app.use(errorHandler);
app.listen(port, () => {
  console.log("Server is runing on " + port);
});
