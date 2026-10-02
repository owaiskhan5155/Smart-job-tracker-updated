import { Router } from "express";

import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} from "../controllers/jobController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createJob);

router.get("/", protect, getJobs);

router.put("/:id", protect, updateJob);

router.delete("/:id", protect, deleteJob);

export default router;
