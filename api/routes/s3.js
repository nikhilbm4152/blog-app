const express = require("express");
const { s3u, s3Delete } = require("../AWS S3/s3-connection");
const Post = require("../models/post");

const router = new express.Router();

router.use(express.static("front"));

// CONNECTING TO S3
router.get("/s3url", async (req, res) => {
  const url = await s3u();
  res.send({ url });
});

router.delete("/s3del/:id", async (req, res) => {
  const findPost = await Post.findById(req.params.id);
  let key = findPost.photo.split("/")[3];
  console.log(key);
  await s3Delete(key);
  res.send("object deleted ");
});

module.exports = router;
