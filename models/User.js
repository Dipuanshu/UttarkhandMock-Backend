/** @format */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" }, // admin / user
});

export default mongoose.model("User", userSchema);
