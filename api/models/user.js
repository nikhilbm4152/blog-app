const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "enter diffrent id"],
    },
    email: {
      type: String,
      required: [true, "Please enter a valid email"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Please add a valid password"],
    },
    profilepic: { type: String, default: "" },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);
// creating the collection with help of "model" method "user" is the name of the collection
// UserSchema defines the structure (Document) of the collection
const User = mongoose.model("User", UserSchema);

module.exports = User;
