const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const errorResponse = require("../util/errorResponse");
const { authRoute } = require("../middleware/securedRoute");

const router = new express.Router();
router.use(express.json());

// @todo
// add secured route to only to post put and delete s that users whithout login can read the posts

// New Post
router.post("/", authRoute, async (req, res, next) => {
  console.log(req.body);
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    console.log(savedPost);

    res.status(200).send(savedPost);
  } catch (error) {
    next(
      new errorResponse("service error please try again after some time", 500)
    );
    // res.status(400).send(error);
  }
});

// UPDATE POST
router.put("/:id", authRoute, async (req, res, next) => {
  try {
    const findPost = await Post.findById(req.params.id);
    if (findPost.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).send(updatePost);
      } catch {
        (error) => res.status(500).send(error);
      }
    } else {
      res.status(401).send("u r not allowed to change the post");
    }
  } catch (error) {
    next(new errorResponse("error while updating", 500));
  }
});

// DELETE POST
router.delete("/:id", authRoute, async (req, res, next) => {
  try {
    const findPost = await Post.findById(req.params.id);
    if (findPost.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).send("post is deleated");
      } catch {
        (error) => res.status(500).send(error);
      }
    } else {
      res.status(401).send("u r not allowed to delete the post");
    }
  } catch (error) {
    next(new errorResponse("Post could not be deleted", 500));
  }
});

// GetPOST
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).send(post);
  } catch (error) {
    next(new errorResponse(error, 500));
    // res.status(400).send(error);
  }
});

// GET ALL POST OR CATOGORY POST OR USERNAME POST

router.get("/", async (req, res, next) => {
  const userName = req.query.user; //req.query select only the value after the ? in the requested URL ie "/?user = "john
  const catgyName = req.query.catgy;
  try {
    let posts;
    if (userName) {
      posts = await Post.find({ username: userName }).sort({ createdAt: -1 });
    } else if (catgyName) {
      posts = await Post.find({ categories: { $in: [catgyName] } });
    } else {
      posts = await Post.find().sort({ createdAt: -1 });
    }
    res.status(200).send(posts);
  } catch (error) {
    next(new errorResponse(error, 500));
  }
});

module.exports = router;
