const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = new express.Router();
router.use(express.json()); //express.json is used to parse the incomming req.body

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //entering the fields of the document which will be capture from UI and storing in new variable(newUser)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    // save method is used to create the document
    const regUser = await newUser.save(); //save method returns promises so use await
    res.status(200).send(regUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(500).send("wrong credentials");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(500).send("wrong credentials");
    }

    const { password, ...others } = user._doc;
    res.status(200).send(others);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
