/** @format */

import Note from "../models/Note.js";

export const uploadNote = async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      fileUrl: `/uploads/${req.file.filename}`,
    });

    await note.save();
    res.json({ message: "Note uploaded", note });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};
 