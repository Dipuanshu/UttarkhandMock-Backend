/** @format */

import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  fileUrl: String, // PDF path
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Note", noteSchema);
