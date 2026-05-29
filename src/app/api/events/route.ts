import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { eventSchema, validateData } from "@/validators/schemas";
import { isValidObjectId } from "@/lib/security";

// GET /api/events - Get all events (public)
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "0");
    const activeOnly = searchParams.get("active") !== "false";

    const query: Record<string, unknown> = {};
    if (activeOnly) query.isActive = true;
    if (category) query.category = category;

    let eventsQuery = Event.find(query).sort({ date: -1 });
    if (limit > 0) eventsQuery = eventsQuery.limit(limit);

    const events = await eventsQuery;

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST /api/events - Create event (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = validateData(eventSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    await dbConnect();

    const event = await Event.create({
      ...validation.data,
      createdBy: session.user.email,
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

// PUT /api/events - Update event
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
        { error: "Valid event ID is required" },
        { status: 400 }
      );
    }

    const validation = validateData(eventSchema, updateData);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    await dbConnect();

    const event = await Event.findByIdAndUpdate(id, validation.data, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

// DELETE /api/events - Delete event
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
        { error: "Valid event ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
