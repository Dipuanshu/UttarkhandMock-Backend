/** @format */

import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  title: String,
  questions: Array,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Test", testSchema);
