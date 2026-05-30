import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Job from "../../../models/Job";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
        await dbConnect();

        // Check and update expired jobs
        await Job.updateMany(
            {
                expiryDate: { $lt: new Date() },
                isActive: true,
            },
            { isActive: false },
        );

        const jobs = await Job.find().sort({ createdAt: -1 });

        const jobsData = jobs.map((job) => job.toObject());
        return NextResponse.json(jobsData);
    } catch (error) {
        console.error("[api/jobs GET] failed:", error);
        return NextResponse.json(
            { error: "Failed to fetch jobs", details: error?.message || String(error) },
            { status: 500 },
        );
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        await dbConnect();

        const { title, description, location, type, expiryDate } =
            await request.json();

        const job = await Job.create({
            title,
            description,
            location,
            type,
            expiryDate: new Date(expiryDate),
            createdBy: session.user.name,
        });

        return NextResponse.json(job, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create job" },
            { status: 500 },
        );
    }
}
