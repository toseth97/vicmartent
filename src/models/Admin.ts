import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "admin" | "editor";
  isDefault: boolean;
  lastLogin?: Date;
  loginAttempts: number;
  lockUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Don't include password in queries by default
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "editor"],
      default: "admin",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    loginAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    lockUntil: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
AdminSchema.index({ email: 1 });

// Virtual for checking if account is locked
AdminSchema.virtual("isLocked").get(function (this: IAdmin) {
  return !!(this.lockUntil && new Date(this.lockUntil).getTime() > Date.now());
});

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
