import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
    const paramsData = await params;
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        await dbConnect();

        const application = await JobApplication.findById(paramsData.id);
        if (!application) {
            return NextResponse.json(
                { error: "Application not found" },
                { status: 404 },
            );
        }

        if (!application.cv || !application.cv.data) {
            return NextResponse.json(
                { error: "CV not found" },
                { status: 404 },
            );
        }

        // Set appropriate headers for file download
        const headers = new Headers();
        headers.set(
            "Content-Type",
            application.cv.contentType || "application/pdf",
        );
        headers.set(
            "Content-Disposition",
            `attachment; filename="${application.cv.filename || `cv-${paramsData.id}.pdf`}"`,
        );

        // Return the buffer directly for better performance
        return new NextResponse(application.cv.data, {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error("Error downloading CV:", error);
        return NextResponse.json(
            { error: "Failed to download CV" },
            { status: 500 },
        );
    }
}
