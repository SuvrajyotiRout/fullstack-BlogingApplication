const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { generatejwt } = require("../JWT/jwt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  try {
    const salt = randomBytes(10).toString();
    const hashedPassword = createHmac("sha256", salt)
      .update(user.password)
      .digest("hex");

    this.password = hashedPassword;
    this.salt = salt;
    console.log(user.password);
    next();
  } catch (error) {
    return console.log(error);
  }
});

userSchema.static("comparePassword", async function (email, password) {
  const user = await this.findOne({ email });
  console.log(user);

  if (!user) return console.log("User not found");

  const salt = user.salt;
  const hashedPassword = user.password;
  const loginPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassword !== loginPassword)
    return console.log("Incorrect password");
  const token = generatejwt(user);
  return token;
});

const User = mongoose.model("user", userSchema);
module.exports = User;
