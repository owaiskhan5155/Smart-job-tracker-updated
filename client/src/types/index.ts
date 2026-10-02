export type JobStatus = "Applied" | "Interview" | "Rejected" | "Offer";

export type JobPriority = "Low" | "Medium" | "High";

export interface Job {
  _id: string;
  company: string;
  position: string;
  priority: JobPriority;
  status: JobStatus;
  location: string;
  notes: string;
  applicationDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type JobFormData = Pick<
  Job,
  "company" | "position" | "priority" | "status" | "location" | "notes"
>;

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}
