import type { Request, Response } from "express";

import Job, { type IJob } from "../models/Job";
import { getErrorMessage } from "../utils/errors";

type CreateJobBody = Pick<
  IJob,
  "company" | "position" | "status" | "location" | "priority" | "notes"
>;

export const createJob = async (
  req: Request<{}, {}, CreateJobBody>,
  res: Response
): Promise<void> => {
  try {
    const { company, position, status, location, priority, notes } = req.body;

    const job = await Job.create({
      company,
      position,
      status,
      location,
      priority,
      notes,
      createdBy: req.user,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: getErrorMessage(error),
    });
  }
};

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const search =
      typeof req.query.search === "string" ? req.query.search : "";

    const jobs = await Job.find({
      createdBy: req.user,
      company: {
        $regex: search,
        $options: "i",
      },
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: getErrorMessage(error),
    });
  }
};

export const updateJob = async (
  req: Request<{ id: string }, {}, Partial<IJob>>,
  res: Response
): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404).json({
        message: "Job not found",
      });
      return;
    }

    if (job.createdBy.toString() !== req.user) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({
      message: getErrorMessage(error),
    });
  }
};

export const deleteJob = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404).json({
        message: "Job not found",
      });
      return;
    }

    if (job.createdBy.toString() !== req.user) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }

    await job.deleteOne();

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: getErrorMessage(error),
    });
  }
};
