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
import filesRoutes from "./routes/filesRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// NOTE: With GridFS you don't need static /uploads serving anymore.
// If you had it earlier, you can remove or keep it — GridFS routes will be used.
app.use("/api/notes", notesRoutes);
app.use("/api/tests", testRoutes);

// Upload to GridFS
app.use("/api/upload", uploadRoutes);
// Serve files from GridFS by filename
app.use("/files", filesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
