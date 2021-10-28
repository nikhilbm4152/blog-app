const User = require("../models/user");
const jwt = require("jsonwebtoken");
const errorResponse = require("../util/errorResponse");

exports.authRoute = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    return next(new errorResponse("Not authorized to access this route", 401));
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id);
    const { username, ...rest } = user;
    next();
  } catch (error) {
    new errorResponse(error);
  }
};
