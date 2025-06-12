const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;

    let existingUser = await userModel.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    if (!userName || !userEmail || !userPassword) {
      return res.status(400).send("All fields are required");
    }
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(userPassword, salt, async (err, hash) => {
        if (err) {
          return res.send(err.message);
        } else {
          let registeredUser = await userModel.create({
            userName,
            userEmail,
            userPassword: hash,
          });
          let token = generateToken(registeredUser);
          res.cookie("token", token);
          if (registeredUser) {
            return res.status(200).send(registeredUser);
          } else {
            return res.status(500).send("Error registering user");
          }
        }
      });
    });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).send("Internal Server Error");
  }
};

exports.loginUser = async (req, res) => {
  let { userEmail, userPassword } = req.body;
  console.log(req.body);
  try {
    if (!userEmail || !userPassword) {
      return res.status(400).send("All fields are required");
    }
    let existingUser = await userModel.findOne({ userEmail });
    if (!existingUser) {
      return res.status(400).send("User does not exist");
    }
    bcrypt.compare(userPassword, existingUser.userPassword, (err, result) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      if (!result) {
        return res.status(400).send("Invalid credentials");
      }
      let token = generateToken(existingUser);
      res.cookie("token", token);
      return res.redirect("/shop");
    //   res.status(200).send(existingUser);
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    return res.status(500).send("Internal Server Error");
  }
};
