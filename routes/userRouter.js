const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Welcome to the user Dashboard");
});

module.exports = userRouter;
