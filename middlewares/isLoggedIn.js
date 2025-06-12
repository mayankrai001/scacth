const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "Please login to access this page");
    return res.redirect("/login");
  }
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/login");
    }
    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("verification failed:", err.message);
    req.flash("error", "Invalid token, please login again");
    return res.redirect("/login");
  }
};

module.exports = isLoggedIn;
