/** @format */
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });

    const files = await bucket.find({ filename }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ msg: "File not found" });
    }

    const fileDoc = files[0];

    // Correct content-type from metadata
    res.set("Content-Type", fileDoc.metadata?.contentType || "application/pdf");

    res.set(
      "Content-Disposition",
      `inline; filename="${encodeURIComponent(fileDoc.filename)}"`
    );

    const downloadStream = bucket.openDownloadStreamByName(filename);

    downloadStream.on("error", () => {
      res.status(404).json({ msg: "File not found" });
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
