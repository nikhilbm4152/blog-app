const aws = require("aws-sdk");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { promisify } = require("util");

dotenv.config();
const randomBytes = promisify(crypto.randomBytes);
// const randomBytes = crypto.randomBytes;
// const rawBytes = randomBytes(16);
// const imageName = rawBytes.toString("hex");

const region = "ap-south-1";
const bucketName = "blog-app-file-upload";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

const s3u = async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 120,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
};

const s3Delete = async function deleteimage(image) {
  const params = {
    Bucket: bucketName,
    Key: image,
  };
  s3.deleteObject(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};

module.exports = { s3u, s3Delete };
