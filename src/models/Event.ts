import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  imageUrl: string;
  date: Date;
  location: string;
  category: "corporate" | "csr" | "awards" | "partnership" | "other";
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
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
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"],
      default: "",
    },
    category: {
      type: String,
      enum: ["corporate", "csr", "awards", "partnership", "other"],
      default: "corporate",
    },
    isActive: {
      type: Boolean,
      default: true,
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

EventSchema.index({ date: -1 });
EventSchema.index({ category: 1 });

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
