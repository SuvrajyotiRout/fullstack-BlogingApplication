const express = require("express");
const User = require("../Models/user");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("Signup");
});

router.get("/login", (req, res) => {
  res.render("Login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const token = await User.comparePassword(email, password);
  console.log("User", token);
  return res.cookie("token", token).redirect("/");
});

router.post("/signup", async (req, res) => {
  const data = req.body;
  const newUser = new User(data);
  await newUser.save();
  return res.redirect("/");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.redirect("/user/login");
});
module.exports = router;
