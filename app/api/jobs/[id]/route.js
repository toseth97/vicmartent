import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Job from "@/models/Job";
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

        const resolvedParams = await params;
        const job = await Job.findById(resolvedParams.id);
        if (!job) {
            return NextResponse.json(
                { error: "Job not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(job);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch job" },
            { status: 500 },
        );
    }
}

export async function PUT(request, { params }) {
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

        const job = await Job.findByIdAndUpdate(
            params.id,
            {
                title,
                description,
                location,
                type,
                expiryDate: new Date(expiryDate),
            },
            { new: true },
        );

        if (!job) {
            return NextResponse.json(
                { error: "Job not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(job);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update job" },
            { status: 500 },
        );
    }
}

// export async function DELETE(request, { params }) {
//     try {
//         const session = await getServerSession(authOptions);
//         if (!session) {
//             return NextResponse.json(
//                 { error: "Unauthorized" },
//                 { status: 401 },
//             );
//         }

//         await dbConnect();

//         // Delete all job applications associated with this job
//         await JobApplication.deleteMany({ jobId: params.id });

//         // Delete the job
//         const job = await Job.findByIdAndDelete(params.id);

//         if (!job) {
//             return NextResponse.json(
//                 { error: "Job not found" },
//                 { status: 404 },
//             );
//         }

//         return NextResponse.json({
//             message: "Job and associated applications deleted successfully",
//         });
//     } catch (error) {
//         return NextResponse.json(
//             { error: "Failed to delete job" },
//             { status: 500 },
//         );
//     }
// }

export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        console.log("SESSION:", session);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized - no session" },
                { status: 401 },
            );
        }

        await dbConnect();

        const resolvedParams = await params;
        console.log("DELETING JOB:", resolvedParams.id);

        await JobApplication.deleteMany({ jobId: resolvedParams.id });
        const delJob = await Job.findById(resolvedParams.id);
        console.log("DELETED JOB APPLICATIONS FOR JOB:", delJob);
        const job = await Job.findByIdAndDelete(resolvedParams.id);

        if (!job) {
            return NextResponse.json(
                { error: "Job not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error("DELETE ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Failed to delete job" },
            { status: 500 },
        );
    }
}
