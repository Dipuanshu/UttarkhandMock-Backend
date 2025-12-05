/** @format */
import express from "express";
import multer from "multer";
import { uploadNote, getNotes } from "../controllers/notesController.js";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/addNotes", upload.single("file"), uploadNote);
router.get("/getNotes", getNotes);

export default router;
