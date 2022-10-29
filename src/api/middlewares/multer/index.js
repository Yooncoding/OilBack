import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import config from "../../../config";
import CustomError from "../../../utils/customError";

AWS.config.update(config.aws);

const s3 = new AWS.S3();

const postStroage = multerS3({
  s3: s3,
  bucket: "obp",
  key: (req, file, done) => {
    const extension = file.mimetype.split("/")[1];
    const random = Math.random().toString().substr(2, 3);
    done(null, "Post-" + Date.now() + random + "." + extension);
  },
  acl: "public-read-write",
});

const fileFilter = (req, file, done) => {
  const extension = file.mimetype.split("/")[1];
  if (extension === "jpg" || extension === "jpeg" || extension === "png") done(null, true);
  else {
    const error = new CustomError("IMPOSSIBLE_EXTENSION", 400, "확장자명이 *.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다.");
    done(error, false);
  }
};

const postImageUpload = multer({ storage: postStroage, fileFilter });

export default postImageUpload;
