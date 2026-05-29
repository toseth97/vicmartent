import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { inquirySchema, validateData } from "@/validators/schemas";
import { isValidObjectId } from "@/lib/security";

// GET /api/inquiries - Get all inquiries (admin only)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (category) query.category = category;

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

// POST /api/inquiries - Submit inquiry (public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateData(inquirySchema, body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    await dbConnect();

    const inquiry = await Inquiry.create(validation.data);

    return NextResponse.json(
      { message: "Inquiry submitted successfully", id: inquiry._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}

// PUT /api/inquiries - Update inquiry (admin only)
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, isRead, replyMessage } = body;

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Valid inquiry ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const updateData: Record<string, unknown> = {};
    if (status) {
      if (!["new", "read", "replied", "closed"].includes(status)) {
        return NextResponse.json(
          { error: "Invalid status value" },
          { status: 400 }
        );
      }
      updateData.status = status;
    }
    if (typeof isRead === "boolean") updateData.isRead = isRead;
    if (replyMessage) {
      updateData.replyMessage = replyMessage;
      updateData.repliedBy = session.user.email;
      updateData.status = "replied";
    }

    const inquiry = await Inquiry.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!inquiry) {
      return NextResponse.json(
        { error: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json(
      { error: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

// DELETE /api/inquiries - Delete inquiry
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Valid inquiry ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return NextResponse.json(
        { error: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
