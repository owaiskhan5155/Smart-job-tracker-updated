import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import jobRoutes from "./routes/jobRoutes";

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://smart-job-tracker-chi.vercel.app",
    ],
    credentials: true,
    
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/auth", authRoutes);

app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
