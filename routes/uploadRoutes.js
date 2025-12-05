/** @format */

import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { Readable } from "stream";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload  (field name: "file")
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    // get GridFSBucket from mongoose connection
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });

    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    readableStream
      .pipe(uploadStream)
      .on("error", (err) => {
        console.error("Error uploading file to GridFS:", err);
        return res.status(500).json({ msg: "Error uploading file" });
      })
      .on("finish", (file) => {
        // file contains metadata incl. _id and filename
        return res.json({
          msg: "File uploaded successfully",
          fileId: file._id,
          filename: file.filename,
          url: `/files/${encodeURIComponent(file.filename)}`,
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
