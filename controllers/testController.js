/** @format */

import Test from "../models/Test.js";

// Add a test
export const addTest = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const test = await Test.create({ title, questions });
    res.json({ message: "Test Created", test });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tests
export const getTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
