const express = require("express");
const app = express();
const path = require("path");
require('dotenv').config();
const PORT = 8000;
const userRouter = require("./Router/userRouter");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
const { checkthetoken } = require("./Middleware/auth");
const blogRouter = require('./Router/addblogRouter')
const Blogs = require('./Models/addpost')
const DB = process.env.DB_CONNECT;

mongoose
  .connect(DB)
  .then((e) => console.log("Mongodb is connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(checkthetoken("token"));
app.use(express.static(path.resolve("./public/uploads")))

app.get("/", async (req, res) => {
   const allblogs = await Blogs.find({})
  res.render("Home", {
    user: req.user,
    blogs:allblogs
  });

});

app.use("/user", userRouter);
app.use("/blog", blogRouter);


app.listen(PORT, () => console.log(`Server is live on port ${PORT}`));
