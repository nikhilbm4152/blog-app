const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const errorResponse = require("../util/errorResponse");
const jwt = require("jsonwebtoken");

const router = new express.Router();
router.use(express.json()); //express.json is used to parse the incomming req.body
const maxAge = 3 * 24 * 60 * 60;

// REGISTER
router.post("/register", async (req, res, next) => {
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
    createToken(newUser, 200, res);
    // res.status(200).send(regUser);
  } catch (error) {
    next(error); //next points to the errorHandeler middleware in the index.js under app.use

    // res.status(500).send(error);
  }
});

// LOGIN
router.post("/login", async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new errorResponse("Please provide an email and password", 400));
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new errorResponse("wrong credentials", 401));
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return next(new errorResponse("wrong credentials", 401));
    }
    let tokenjwt = createToken(user, 200, res);
    res.cookie("jwt", tokenjwt, { httpOnly: true, maxAge: maxAge * 1000 });
    // const { password, ...others } = user._doc;
    // res.status(200).send(others);
  } catch (err) {
    next(err);
  }
});

const createToken = (user, statusCode, res) => {
  let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  const { username } = user;
  res
    .cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: true,
    })
    .status(statusCode)
    .json({ sucess: true, token, username });
};

module.exports = router;
