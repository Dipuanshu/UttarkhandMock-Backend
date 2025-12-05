/** @format */

import mongoose from "mongoose";
import { Readable } from "stream";
import Note from "../models/Note.js";

export const uploadNote = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // GridFS bucket
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });

    // File buffer → readable stream
    const readable = new Readable();
    readable.push(req.file.buffer);
    readable.push(null);

    // Open upload stream
    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    readable
      .pipe(uploadStream)
      .on("error", (err) => {
        console.error(err);
        res.status(500).json({ message: "Error uploading file" });
      })
      .on("finish", async () => {
        // Use uploadStream properties instead of file argument
        const note = new Note({
          title,
          fileUrl: `/files/${uploadStream.filename}`,
          fileId: uploadStream.id,
        });

        await note.save();

        res.json({
          message: "Note uploaded successfully",
          note,
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
