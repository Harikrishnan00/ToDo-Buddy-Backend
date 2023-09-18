const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

module.exports.authonticator = async (req, res, next) => {
  const token = req.cookies.access_token;
  const user = req.user;
  if (!token && !user) {
    res.status(400).json({
      message: "token does not exist",
      status: "authentication failed",
    });
  } else {
    if (token) {
      try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        const userData = await User.findOne({ _id: data.id });
        req.user = userData;
        return next();
      } catch {
        res.status(400).json({
          message: "token is not valid",
          status: "authentication failed",
        });
      }
    } else if (user) {
      return next();
    }
  }
};
