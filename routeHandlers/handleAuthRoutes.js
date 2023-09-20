const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

module.exports.signup = async (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, SALT_ROUNDS, async function (err, hash) {
    if (err) console.log(err);
    else {
      const userData = await User.findOne({ email });
      if (userData) {
        res.status(400).json({
          message: "user with the email is allready exist",
          status: "failed",
          email,
        });
      } else {
        try {
          
          const user = new User({
            email,
            password: hash,
          });

          const response = await user.save();
          const token = jwt.sign(
            { id: response.id, role: "user" },
            process.env.SECRET_KEY
          );

          res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .status(200)
            .json({
              message: "user successfully created",
              status: "completed",
              userID: response.id,
            });
        } catch (error) {
          console.log(error);
          res.redirect("/signup/failure");
        }
      }
    }
  });
};

module.exports.signupFailure = async (req, res) => {
  res.status(400).json({
    message: "user creation failed",
    status: "user registratio failed",
  });
};

module.exports.login = async (req, res) => {
  if (req.user) {
    const token = jwt.sign(
      { id: req.user.id, role: "user" },
      process.env.SECRET_KEY
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "user successfully created",
        status: "completed"
      });
  }
};

module.exports.authenticationSuccess = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "user is successfully validated",
      status: "authentication successfull",
      profile: req.user,
    });
  } else {
    res.status(400).json({
      message: "user validation failed",
      status: "authentication failed",
    });
  }
};

module.exports.logout = (req, res) => {
  if (req.cookies.access_token) {
    res
      .status(200)
      .cookie("access_token", " ", {
        maxAge: 100,
      })
      .redirect("http://localhost:5173");
  } else {
    req.logout();
    res.redirect("http://localhost:5173");
  }
};
