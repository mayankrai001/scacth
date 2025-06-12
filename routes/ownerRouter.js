const express = require("express");
const ownerRouter = express.Router();
const ownerModel = require("../models/ownerModel");

ownerRouter.get("/", (req, res) => {
  res.send("Welcome to the Owner Dashboard");
});

if (process.env.NODE_ENV == "development") {
  ownerRouter.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .status(400)
        .send("You don't have permission to create a new owner");
    }
    let { ownerName, ownerEmail, ownerPassword } = req.body;
    let createdOwner = await ownerModel.create({
      ownerName,
      ownerEmail,
      ownerPassword,
    });
    res.status(200).send(createdOwner);
  });
}

module.exports = ownerRouter;
