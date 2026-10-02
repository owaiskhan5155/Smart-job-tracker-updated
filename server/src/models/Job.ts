import { Schema, model, type Types } from "mongoose";

export const JOB_PRIORITIES = ["Low", "Medium", "High"] as const;
export const JOB_STATUSES = ["Applied", "Interview", "Rejected", "Offer"] as const;

export type JobPriority = (typeof JOB_PRIORITIES)[number];
export type JobStatus = (typeof JOB_STATUSES)[number];

export interface IJob {
  company: string;
  position: string;
  priority: JobPriority;
  status: JobStatus;
  location: string;
  applicationDate: Date;
  createdBy: Types.ObjectId;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    company: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: JOB_PRIORITIES,
      default: "Medium",
    },

    status: {
      type: String,
      enum: JOB_STATUSES,
      default: "Applied",
    },

    location: {
      type: String,
      default: "Remote",
    },

    applicationDate: {
      type: Date,
      default: Date.now,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IJob>("Job", jobSchema);
