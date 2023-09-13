const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

module.exports.signup = async (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, SALT_ROUNDS, async function (err, hash) {
    if (err) console.log(err);
    else {
      const user = new User({
        email,
        password: hash,
      });
      const response = await user.save();
      console.log(response);
      res.json(response);
    }
  });
};

module.exports.googleLoginSuccess = (req, res) => {
  if (req.user) {
    res.status(200).json({
      message:"success",
      profile:req.user
    });
  } else {
    res.redirect("http://localhost:3001/api/auth/callback/failure");
  }
};

module.exports.googleLoginFailure = (req, res) =>{
    res.status(400).json({
      success:"failed",
      message:"failure"
    });
}

