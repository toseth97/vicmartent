import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        await dbConnect();

        const application = await JobApplication.findById(params.id).populate(
            "jobId",
        );

        if (!application) {
            return NextResponse.json(
                { error: "Application not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(application);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch application" },
            { status: 500 },
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        await dbConnect();

        const application = await JobApplication.findByIdAndDelete(params.id);

        if (!application) {
            return NextResponse.json(
                { error: "Application not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({ message: "Application deleted" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete application" },
            { status: 500 },
        );
    }
}
