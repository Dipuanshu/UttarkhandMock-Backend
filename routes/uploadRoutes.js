/** @format */

import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// File storage (Render Compatible)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_PATH || "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// Upload API
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  res.json({
    msg: "File uploaded successfully",
    fileUrl: `/uploads/${req.file.filename}`,
  });
});

export default router;
