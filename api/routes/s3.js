const express = require("express");
const { s3u, s3Delete } = require("../AWS S3/s3-connection");
const Post = require("../models/post");
const User = require("../models/user");

const router = new express.Router();

router.use(express.static("front"));

// CONNECTING TO S3
router.get("/s3url", async (req, res) => {
  const url = await s3u();
  res.send({ url });
});

router.delete("/s3del/:id", async (req, res) => {
  // const findPost = await Post.findById(req.params.id);
  // if (findPost.photo !== "") {
  // let key = findPost.photo.split("/")[3];
  // console.log(key);
  // await s3Delete(key);
  await s3Delete(req.params.id);
  // }
  res.send("object deleted ");
});

router.delete("/s3del/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user.profilepic !== "") {
    let key = user.profilepic.split("/")[3];
    console.log(key);
    await s3Delete(key);
  }
  res.send("object deleted ");
});

module.exports = router;
