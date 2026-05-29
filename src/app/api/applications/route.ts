import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Application from "@/models/Application";
import { applicationSchema, validateData } from "@/validators/schemas";
import { isValidObjectId } from "@/lib/security";

// GET /api/applications - Get all applications (admin only)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const vacancyId = searchParams.get("vacancyId");
    const status = searchParams.get("status");

    const query: Record<string, unknown> = {};
    if (vacancyId && isValidObjectId(vacancyId)) query.vacancyId = vacancyId;
    if (status) query.status = status;

    const applications = await Application.find(query)
      .populate("vacancyId", "title location type")
      .sort({ createdAt: -1 });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

// POST /api/applications - Submit application (public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateData(applicationSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    await dbConnect();

    // Verify vacancy exists and is active
    const Vacancy = (await import("@/models/Vacancy")).default;
    const vacancy = await Vacancy.findOne({
      _id: validation.data.vacancyId,
      isActive: true,
    });

    if (!vacancy) {
      return NextResponse.json(
        { error: "Vacancy not found or no longer active" },
        { status: 404 }
      );
    }

    const application = await Application.create({
      ...validation.data,
      jobTitle: vacancy.title,
    });

    return NextResponse.json(
      { message: "Application submitted successfully", id: application._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

// PUT /api/applications - Update application status (admin only)
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Valid application ID is required" },
        { status: 400 }
      );
    }

    if (!["pending", "reviewed", "shortlisted", "rejected", "hired"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    await dbConnect();

    const updateData: Record<string, unknown> = { status };
    if (notes) updateData.notes = notes;

    const application = await Application.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}
