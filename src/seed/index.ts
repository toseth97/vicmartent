import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dbConnect from "../lib/mongodb";
import Admin from "../models/Admin";
import Director from "../models/Director";
import Settings from "../models/Settings";

const MONGODB_URI = process.env.MONGODB_URI!;

async function seed() {
  try {
    await dbConnect();
    console.log("Connected to MongoDB");

    // Create default admin
    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL || "admin@vic.com",
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || "12345678",
        12
      );

      await Admin.create({
        name: "Super Admin",
        email: process.env.ADMIN_EMAIL || "admin@vic.com",
        password: hashedPassword,
        role: "superadmin",
        isDefault: true,
      });
      console.log("Default admin created successfully");
    } else {
      console.log("Default admin already exists");
    }

    // Create default directors
    const existingDirectors = await Director.countDocuments();
    if (existingDirectors === 0) {
      await Director.insertMany([
        {
          name: "Mr. Victor O. Martins",
          position: "Managing Director / CEO",
          bio: "A visionary leader with over 25 years of experience in the FMCG distribution industry. Mr. Martins founded Vicmart Enterprises with a commitment to delivering superior products and services that improve the lives of consumers across Nigeria.",
          imageUrl: "/assets/images/aavanew1.jpg",
          order: 1,
          isActive: true,
        },
        {
          name: "Mrs. Adebola Martins",
          position: "Executive Director, Finance",
          bio: "With extensive experience in financial management and corporate strategy, Mrs. Martins oversees the financial operations of Vicmart Enterprises, ensuring sustainable growth and fiscal responsibility.",
          imageUrl: "/assets/images/aavanew1.jpg",
          order: 2,
          isActive: true,
        },
        {
          name: "Mr. Olumide Adeyemi",
          position: "Director, Operations",
          bio: "An operations expert with deep knowledge of supply chain management and logistics. Mr. Adeyemi ensures that Vicmart's distribution network operates at peak efficiency across all regions.",
          imageUrl: "/assets/images/aavanew1.jpg",
          order: 3,
          isActive: true,
        },
        {
          name: "Mr. Chinedu Eze",
          position: "Director, Sales & Marketing",
          bio: "A seasoned marketing professional with a proven track record in FMCG brand building and market penetration strategies. Mr. Eze drives Vicmart's commercial growth and brand visibility.",
          imageUrl: "/assets/images/aavanew1.jpg",
          order: 4,
          isActive: true,
        },
      ]);
      console.log("Default directors created successfully");
    } else {
      console.log("Directors already exist");
    }

    // Create default settings
    const existingSettings = await Settings.countDocuments();
    if (existingSettings === 0) {
      await Settings.create({});
      console.log("Default settings created successfully");
    } else {
      console.log("Settings already exist");
    }

    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
