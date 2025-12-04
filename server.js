/** @format */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import notesRoutes from "./routes/notesRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Render disk path or local
const uploadPath = process.env.UPLOAD_PATH || path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadPath));

app.use("/api/notes", notesRoutes);
app.use("/api/tests", testRoutes);

// Upload API
app.use("/api/upload", uploadRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
