/** @format */

import express from "express";
import multer from "multer";
import { uploadNote, getNotes } from "../controllers/notesController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/addNotes", upload.single("file"), uploadNote);
router.get("/getNotes", getNotes);

export default router;
