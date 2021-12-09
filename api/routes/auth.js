const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const errorResponse = require("../util/errorResponse");
const jwt = require("jsonwebtoken");
const sendEmail = require("../util/sendemail");
const crypto = require("crypto");

const router = new express.Router();
router.use(express.json()); //express.json is used to parse the incomming req.body
const maxAge = 3 * 24 * 60 * 60;

// REGISTER
router.post("/register", async (req, res, next) => {
  try {
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(req.body.password, salt);

    //entering the fields of the document which will be capture from UI and storing in new variable(newUser)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
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
    createToken(user, 200, res);
    // let tokenjwt = createToken(user, 200, res);
    // res.cookie("jwt", tokenjwt, { httpOnly: true, maxAge: maxAge * 1000 });
    // const { password, ...others } = user._doc;
    // res.status(200).send(others);
  } catch (err) {
    next(err);
  }
});

// Forgot Password

router.post("/forgotpassword", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new errorResponse("Email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please click the following link to reset ur password:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Rest Requested",
        text: message,
      });
      res.status(200).json({ sucess: true, data: "Email Sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      return next(new errorResponse("email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
});

//Reset Password
router.put("/resetpassword/:resetToken", async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  console.log(Date.now());
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      next(new errorResponse("Invalid Token", 404));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    createToken(user, 200, res);
  } catch (error) {
    next(error);
  }
});

// creating the new jwt token
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
