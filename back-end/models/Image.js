const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema(
  {
    urlImage: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("images", imageSchema);
module.exports = Image;
