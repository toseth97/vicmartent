import mongoose, { Schema, Document, Types } from "mongoose";

export interface IApplication extends Document {
  vacancyId: Types.ObjectId;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  cvUrl: string;
  cvFilename: string;
  country?: string;
  state?: string;
  yearsOfExperience?: number;
  lastCompanyWorked?: string;
  expectedSalary?: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    vacancyId: {
      type: Schema.Types.ObjectId,
      ref: "Vacancy",
      required: [true, "Vacancy ID is required"],
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: [20, "Phone cannot exceed 20 characters"],
    },
    coverLetter: {
      type: String,
      trim: true,
      maxlength: [5000, "Cover letter cannot exceed 5000 characters"],
      default: "",
    },
    cvUrl: {
      type: String,
      trim: true,
      default: "",
    },
    cvFilename: {
      type: String,
      trim: true,
      default: "",
    },
    country: {
      type: String,
      trim: true,
      default: "",
    },
    state: {
      type: String,
      trim: true,
      default: "",
    },
    yearsOfExperience: {
      type: Number,
      min: [0, "Years of experience must be a positive number"],
    },
    lastCompanyWorked: {
      type: String,
      trim: true,
      default: "",
    },
    expectedSalary: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected", "hired"],
      default: "pending",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

ApplicationSchema.index({ vacancyId: 1 });
ApplicationSchema.index({ status: 1 });
ApplicationSchema.index({ email: 1 });

export default mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema);
