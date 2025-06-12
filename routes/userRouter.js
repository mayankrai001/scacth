const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.get("/", (req, res) => {
  res.send("Welcome to the user Dashboard");
});

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);

module.exports = userRouter;
