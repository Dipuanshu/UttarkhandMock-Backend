/** @format */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import testRoutes from "./routes/testRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tests", testRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
