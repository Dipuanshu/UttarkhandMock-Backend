/** @format */

import express from "express";
import { addTest, getTests } from "../controllers/testController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/addTest", addTest);
router.get("/getTest", getTests);

export default router;
