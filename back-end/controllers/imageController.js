const Image = require("../models/Image");
const formidable = require("formidable");
const fs = require("fs");
exports.postImage = async (req, res, next) => {
  try {
    const urls = [];
    const form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.multiples = true;
    form.maxFieldsSize = 10 * 1024 * 1024;
    const promise = new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        if (files[""].length > 0) {
          files[""].forEach((file) => {
            const url = file["path"].split("\\")[1];
            urls.push(url);
          });
        } else {
          urls.push(files[""]["path"].split("\\")[1]);
        }
        res.json({ fields, files }); //: files[""][0]["path"].split("\\")[1]
        resolve(urls);
      });
    });

    promise.then((res) => {
      res.forEach(async (url) => {
        await Image.create({ urlImage: url });
      });
    });
  } catch (err) {
    next(err);
  }
};
exports.getImage = async (req, res, next) => {
  try {
    const images = await Image.find({}).select("urlImage createdAt");
    res.status(200).json({
      status: "Success",
      data: images,
    });
  } catch (error) {
    next(error);
  }
  //   const { imageName } = req.params;
  //   fs.readFile("uploads//" + imageName, (err, imageData) => {
  //     if (err) {
  //       res.status(200).json({
  //         status: "error",
  //       });
  //       return;
  //     }
  //     res.writeHead(200, { "Content-Type": "image/png" });
  //     res.end(imageData);
  //   });
};
