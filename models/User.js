const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const { createUserToken } = require("../services/auth.service");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.static("generateToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User Not Found!");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Password Incorrect!");
  const token = createUserToken(user);
  return token;
});

const User = model("user", userSchema);
module.exports = User;
