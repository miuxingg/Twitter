const Post = require("../models/Post");

//[GET] all post
exports.getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find({})
      //populate: truy tim den noi chua thong tin cua tac gia (trong model phau co ref), và chỉ lấy ID với tên
      .populate("author", "name")
      //chỉ lấy 2 trường là content và createAt
      .select("content createdAt");

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: { posts },
    });
  } catch (err) {
    next(err);
  }
};

//[POST] create one post
exports.createOnePost = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const post = await Post.create({ ...req.body, author: userId });
    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

//[Update] update one post
exports.updateOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndUpdate(postId, { ...req.body });
    res.status(200).json({
      status: "success",
      data: { post },
    });
  } catch (err) {
    next(err);
  }
};

//[Delete] deleteOnePost
exports.deleteOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);
    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (err) {
    next(err);
  }
};
