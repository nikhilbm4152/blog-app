const ErrorResponse = require("../util/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  //duplicate field error in the mongoose
  //   {
  //     "driver": true,
  //     "name": "MongoError",
  //     "index": 0,
  //     "code": 11000, //error code which we are comparing
  //     "keyPattern": {
  //         "username": 1
  //     },
  //     "keyValue": {
  //         "username": "mama"
  //     }
  // }
  if (err.code === 11000) {
    const message = `Enter diffrent User Name / Duplicate Field value entered`;
    error = new ErrorResponse(message, 400);
  }

  // mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  console.log(error.message);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
