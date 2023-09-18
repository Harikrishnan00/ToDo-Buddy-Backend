const bcrypt = require("bcrypt");
const User = require("../model/userModel");

module.exports.loginAuthenticator = async (req, res, next) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ email });
  if (!userData) {
    return res.status(400).json({
      message: "username or password is incorrect",
      status: "login failed",
    });
  } else {
    bcrypt.compare(password, userData.password, function (err, result) {
      if (!result) {
        return res.status(400).json({
          message: "username or password is incorrect",
          status: "login failed",
        });
      } else {
        req.user = userData;
        return next();
      }
    });
  }
};
