import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category: "general" | "partnership" | "careers" | "products" | "complaint";
  status: "new" | "read" | "replied" | "closed";
  isRead: boolean;
  repliedBy?: string;
  replyMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
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
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, "Phone cannot exceed 20 characters"],
      default: "",
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [5000, "Message cannot exceed 5000 characters"],
    },
    category: {
      type: String,
      enum: ["general", "partnership", "careers", "products", "complaint"],
      default: "general",
    },
    status: {
      type: String,
      enum: ["new", "read", "replied", "closed"],
      default: "new",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    repliedBy: {
      type: String,
      default: "",
    },
    replyMessage: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

InquirySchema.index({ status: 1 });
InquirySchema.index({ isRead: 1 });
InquirySchema.index({ createdAt: -1 });

export default mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
