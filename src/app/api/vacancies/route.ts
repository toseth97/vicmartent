import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Vacancy from "@/models/Vacancy";
import { vacancySchema, validateData } from "@/validators/schemas";
import { isValidObjectId } from "@/lib/security";

// GET /api/vacancies - Get all vacancies (public)
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const department = searchParams.get("department");
    const type = searchParams.get("type");
    const activeOnly = searchParams.get("active") !== "false";

    const query: Record<string, unknown> = {};
    if (activeOnly) query.isActive = true;
    if (department) query.department = department;
    if (type) query.type = type;

    const vacancies = await Vacancy.find(query).sort({ createdAt: -1 });

    return NextResponse.json(vacancies);
  } catch (error) {
    console.error("Error fetching vacancies:", error);
    return NextResponse.json(
      { error: "Failed to fetch vacancies" },
      { status: 500 }
    );
  }
}

// POST /api/vacancies - Create vacancy (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = validateData(vacancySchema, body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    await dbConnect();

    const vacancy = await Vacancy.create({
      ...validation.data,
      createdBy: session.user.email,
    });

    return NextResponse.json(vacancy, { status: 201 });
  } catch (error) {
    console.error("Error creating vacancy:", error);
    return NextResponse.json(
      { error: "Failed to create vacancy" },
      { status: 500 }
    );
  }
}

// PUT /api/vacancies - Update vacancy
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
        { error: "Valid vacancy ID is required" },
        { status: 400 }
      );
    }

    const validation = validateData(vacancySchema, updateData);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    await dbConnect();

    const vacancy = await Vacancy.findByIdAndUpdate(id, validation.data, {
      new: true,
      runValidators: true,
    });

    if (!vacancy) {
      return NextResponse.json(
        { error: "Vacancy not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(vacancy);
  } catch (error) {
    console.error("Error updating vacancy:", error);
    return NextResponse.json(
      { error: "Failed to update vacancy" },
      { status: 500 }
    );
  }
}

// DELETE /api/vacancies - Delete vacancy
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
        { error: "Valid vacancy ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const vacancy = await Vacancy.findByIdAndDelete(id);

    if (!vacancy) {
      return NextResponse.json(
        { error: "Vacancy not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Vacancy deleted successfully" });
  } catch (error) {
    console.error("Error deleting vacancy:", error);
    return NextResponse.json(
      { error: "Failed to delete vacancy" },
      { status: 500 }
    );
  }
}
