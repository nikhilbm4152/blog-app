const express = require("express");
const authRouter = require("./routes/auth");
const updateUser = require("./routes/users");
const newPostRoute = require("./routes/posts");
const newCatgyRouter = require("./routes/categories");
const s3Router = require("./routes/s3");
const cors = require("cors");

require("./db-connection/db-connect");

const app = express();
app.use(express.json());

//registering the new user "/api/auth" it is the initial path and "/register" in the auth router is the end path
//  ie. localhost:8000/api/auth/register
app.use("/api/auth", authRouter);
app.use("/api/user", updateUser);
app.use("/api/post", newPostRoute);
app.use("/api/catgy", newCatgyRouter);
app.use("/api", s3Router);

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen("8000", () => {
  console.log("connection successful");
});
