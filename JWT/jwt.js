const jwt = require("jsonwebtoken");
require("dotenv").config();
  const secretkey = process.env.SECRET;

function generatejwt(user) {
  if (!user) return res.json({ message: "user not found" });
  const payload = {
    id: user._id,
    email: user.email,
    username: user.username,
  };

  const token = jwt.sign(payload, secretkey);
  return token;
}

function varifiytoken(token) {
  const userpayload = jwt.verify(token, secretkey);
  return userpayload;
}

module.exports = {
  generatejwt,
  varifiytoken,
};
