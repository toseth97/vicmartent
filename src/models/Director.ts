import mongoose, { Schema, Document } from "mongoose";

export interface IDirector extends Document {
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  linkedinUrl?: string;
  twitterUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DirectorSchema = new Schema<IDirector>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      maxlength: [200, "Position cannot exceed 200 characters"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
      trim: true,
      maxlength: [1000, "Bio cannot exceed 1000 characters"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    linkedinUrl: {
      type: String,
      trim: true,
      default: "",
    },
    twitterUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

DirectorSchema.index({ order: 1 });

export default mongoose.models.Director || mongoose.model<IDirector>("Director", DirectorSchema);
