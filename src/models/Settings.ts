import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  siteName: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  twitterUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  maintenanceMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteName: {
      type: String,
      default: "Vicmart Enterprises Limited",
      trim: true,
    },
    tagline: {
      type: String,
      default: "Distributing Superior Products & Services",
      trim: true,
    },
    description: {
      type: String,
      default:
        "An indigenous firm involved in the marketing and sales of FMCG and other allied products.",
      trim: true,
    },
    address: {
      type: String,
      default: "Block C, Plot 2, Oluyole Extension, Oluyole, Ibadan.",
      trim: true,
    },
    phone: {
      type: String,
      default: "+234-80-5509-6909",
      trim: true,
    },
    email: {
      type: String,
      default: "enquiries@vicmartent.com",
      trim: true,
    },
    twitterUrl: {
      type: String,
      default: "#",
      trim: true,
    },
    facebookUrl: {
      type: String,
      default: "#",
      trim: true,
    },
    instagramUrl: {
      type: String,
      default: "#",
      trim: true,
    },
    linkedinUrl: {
      type: String,
      default: "#",
      trim: true,
    },
    youtubeUrl: {
      type: String,
      default: "#",
      trim: true,
    },
    heroTitle: {
      type: String,
      default:
        "We Distribute Superior Products and Services that Improves the Life of Consumers",
      trim: true,
    },
    heroSubtitle: {
      type: String,
      default:
        "Leading FMCG distribution company in Nigeria with a commitment to quality and excellence",
      trim: true,
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);
