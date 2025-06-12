const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { userEmail: user.userEmail, id: user._id },
    process.env.JWT_KEY
  );
};

module.exports = generateToken;
