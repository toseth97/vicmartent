import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { createAdminSchema, validateData } from "@/validators/schemas";
import { isValidObjectId } from "@/lib/security";

// GET /api/admins - Get all admins (admin only)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only superadmins can view all admins
    if ((session.user as { role?: string }).role !== "superadmin") {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    await dbConnect();
    const admins = await Admin.find().select("-password -loginAttempts -lockUntil").sort({ createdAt: -1 });

    return NextResponse.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json(
      { error: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}

// POST /api/admins - Create admin (superadmin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if ((session.user as { role?: string }).role !== "superadmin") {
      return NextResponse.json(
        { error: "Only superadmins can create admin accounts" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validation = validateData(createAdminSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: validation.data.email });
    if (existingAdmin) {
      return NextResponse.json(
        { error: "An admin with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(validation.data.password, 12);

    const admin = await Admin.create({
      name: validation.data.name,
      email: validation.data.email,
      password: hashedPassword,
      role: validation.data.role || "admin",
    });

    // Return without password
    const { password: _, ...adminWithoutPassword } = admin.toObject();

    return NextResponse.json(adminWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json(
      { error: "Failed to create admin" },
      { status: 500 }
    );
  }
}

// DELETE /api/admins - Delete admin (superadmin only)
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if ((session.user as { role?: string }).role !== "superadmin") {
      return NextResponse.json(
        { error: "Only superadmins can delete admin accounts" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Valid admin ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Prevent deleting default admin
    const admin = await Admin.findById(id);
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    if (admin.isDefault) {
      return NextResponse.json(
        { error: "Cannot delete the default admin account" },
        { status: 400 }
      );
    }

    await Admin.findByIdAndDelete(id);

    return NextResponse.json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    return NextResponse.json(
      { error: "Failed to delete admin" },
      { status: 500 }
    );
  }
}
