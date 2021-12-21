const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const errorResponse = require("../util/errorResponse");
const { authRoute } = require("../middleware/securedRoute");

const router = new express.Router();
router.use(express.json());

// UPDATE-USER
router.put("/:id", async (req, res, next) => {
  if (req.body.userId === req.params.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, // $set - is the property used to update the "all" fields of the document which r comming from request
        },
        { new: true } //this is to create new document ie updated one
      );
      console.log(updatedUser);
      const { password, ...others } = updatedUser._doc;
      console.log(others);
      res.status(200).json({ sucess: true, others });
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    return next(new errorResponse("Not Authorised", 401));
  }
});

// Delete User

router.delete("/:id", authRoute, async (req, res, next) => {
  try {
    const postUser = await User.findById(req.params.id);
    try {
      await Post.deleteMany({ username: postUser.username });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("the user is deleated");
    } catch {
      (error) => res.status(401).send(error);
    }
  } catch (error) {
    next(new errorResponse("user not found", 401));
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).send(others);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
