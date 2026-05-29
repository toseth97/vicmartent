import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Director from "@/models/Director";
import { directorSchema, validateData } from "@/validators/schemas";
import { isValidObjectId, sanitizeObject } from "@/lib/security";

// GET /api/directors - Get all directors (public)
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("active") !== "false";

    const query = activeOnly ? { isActive: true } : {};
    const directors = await Director.find(query).sort({ order: 1 });

    return NextResponse.json(directors);
  } catch (error) {
    console.error("Error fetching directors:", error);
    return NextResponse.json(
      { error: "Failed to fetch directors" },
      { status: 500 }
    );
  }
}

// POST /api/directors - Create director (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = validateData(directorSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    await dbConnect();

    const director = await Director.create({
      ...validation.data,
      createdBy: session.user.email,
    });

    return NextResponse.json(director, { status: 201 });
  } catch (error) {
    console.error("Error creating director:", error);
    return NextResponse.json(
      { error: "Failed to create director" },
      { status: 500 }
    );
  }
}

// PUT /api/directors - Update director (admin only)
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Valid director ID is required" },
        { status: 400 }
      );
    }

    const validation = validateData(directorSchema, updateData);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    await dbConnect();

    const director = await Director.findByIdAndUpdate(id, validation.data, {
      new: true,
      runValidators: true,
    });

    if (!director) {
      return NextResponse.json(
        { error: "Director not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(director);
  } catch (error) {
    console.error("Error updating director:", error);
    return NextResponse.json(
      { error: "Failed to update director" },
      { status: 500 }
    );
  }
}

// DELETE /api/directors - Delete director (admin only)
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
        { error: "Valid director ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const director = await Director.findByIdAndDelete(id);

    if (!director) {
      return NextResponse.json(
        { error: "Director not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Director deleted successfully" });
  } catch (error) {
    console.error("Error deleting director:", error);
    return NextResponse.json(
      { error: "Failed to delete director" },
      { status: 500 }
    );
  }
}
