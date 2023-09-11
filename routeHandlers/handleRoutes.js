const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

module.exports.signup = async (req, res) => {
  const { email, password } = req.body;
  // const response =await adduserToDB(email,password)
  adduserToDB(email,password)
  res.json({ pk: "pk" });
};

async function adduserToDB(email, password) {
  bcrypt.hash(password, SALT_ROUNDS, async function (err, hash) {
    const user = new User({
      email,
      password:hash,
    });
    const response = await user.save();
    return response;
  });
}

