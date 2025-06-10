const express = require("express");
const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  res.send("Welcome to the product Dashboard");
});

module.exports = productRouter;
