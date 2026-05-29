import mongoose, { Schema, Document, Types } from "mongoose";

export interface IVacancy extends Document {
  title: string;
  description: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  department: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange?: string;
  expiryDate: Date;
  isActive: boolean;
  isUrgent: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const VacancySchema = new Schema<IVacancy>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [10000, "Description cannot exceed 10000 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"],
    },
    type: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      default: "full-time",
    },
    department: {
      type: String,
      trim: true,
      maxlength: [100, "Department cannot exceed 100 characters"],
      default: "General",
    },
    requirements: [{
      type: String,
      trim: true,
    }],
    responsibilities: [{
      type: String,
      trim: true,
    }],
    salaryRange: {
      type: String,
      trim: true,
      default: "",
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isUrgent: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

VacancySchema.index({ isActive: 1, expiryDate: 1 });
VacancySchema.index({ department: 1 });

export default mongoose.models.Vacancy || mongoose.model<IVacancy>("Vacancy", VacancySchema);
