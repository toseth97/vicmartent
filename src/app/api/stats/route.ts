import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Vacancy from "@/models/Vacancy";
import Application from "@/models/Application";
import Inquiry from "@/models/Inquiry";
import Event from "@/models/Event";
import Director from "@/models/Director";

// GET /api/stats - Dashboard statistics (admin only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const [
      totalVacancies,
      activeVacancies,
      totalApplications,
      pendingApplications,
      totalInquiries,
      unreadInquiries,
      totalEvents,
      totalDirectors,
      recentApplications,
      recentInquiries,
    ] = await Promise.all([
      Vacancy.countDocuments(),
      Vacancy.countDocuments({ isActive: true }),
      Application.countDocuments(),
      Application.countDocuments({ status: "pending" }),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ isRead: false }),
      Event.countDocuments({ isActive: true }),
      Director.countDocuments({ isActive: true }),
      Application.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email jobTitle status createdAt"),
      Inquiry.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name email subject status isRead createdAt"),
    ]);

    return NextResponse.json({
      vacancies: { total: totalVacancies, active: activeVacancies },
      applications: { total: totalApplications, pending: pendingApplications },
      inquiries: { total: totalInquiries, unread: unreadInquiries },
      events: { total: totalEvents },
      directors: { total: totalDirectors },
      recentActivity: {
        applications: recentApplications,
        inquiries: recentInquiries,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
