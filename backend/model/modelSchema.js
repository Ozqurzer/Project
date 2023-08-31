import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 25 },
  email: { type: String, required: true, unique: true },
  password: { type: String, minlength: 6, maxlength: 25, required: true },
  role: { type: String, enum: ["tutor", "student"], default: "user" },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  console.log({ salt });
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  console.log({ hashedPassword });
  next();
});

UserSchema.methods.isPasswordValid = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

export const User = mongoose.model("User", UserSchema);
