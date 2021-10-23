const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcrypt");

const router = new express.Router();
router.use(express.json());

// UPDATE-USER
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    //   if the request body contains password i am directly hassing the passw and direclty sending it to mongo db
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, // $set - is the property used to update the "all" fields of the document which r comming from request
        },
        { new: true } //this is to create new document ie updated one
      );
      res.status(200).send(updatedUser);
    } catch {
      (error) => res.status(500).send(error);
    }
  } else {
    res.status(401).send("You Can Update Only Your Account");
  }
});

// Delete User

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const postUser = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: postUser.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("the user is deleated");
      } catch {
        (error) => res.status(401).send(error);
      }
    } catch {
      (error) => res.status(401).send("user not found");
    }
  } else {
    res.status(401).send("You Can't delete this user");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).send(others);
  } catch {
    (error) => res.status(500).send(error);
  }
});

module.exports = router;
