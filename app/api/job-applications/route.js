import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";
import Job from "../../../models/Job";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        await dbConnect();

        const applications = await JobApplication.find()
            .populate("jobId")
            .sort({ createdAt: -1 });

        return NextResponse.json(applications);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch applications" },
            { status: 500 },
        );
    }
}

export async function POST(request) {
    try {
        await dbConnect();

        const formData = await request.formData();
        const jobId = formData.get("jobId");
        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const cvFile = formData.get("cv");
        const country = formData.get("country");
        const state = formData.get("state");
        const yearsOfExperience = formData.get("yearsOfExperience");
        const lastCompanyWorked = formData.get("lastCompanyWorked");
        const expectedSalary = formData.get("expectedSalary");
        const commentQuestion = formData.get("commentQuestion");

        // Sanitize inputs
        const sanitizedName = name?.toString().trim();
        const sanitizedEmail = email?.toString().trim();
        const sanitizedPhone = phone?.toString().trim();
        const sanitizedCountry = country?.toString().trim();
        const sanitizedState = state?.toString().trim();
        const sanitizedLastCompanyWorked = lastCompanyWorked?.toString().trim();
        const sanitizedCommentQuestion = commentQuestion?.toString().trim();

        // Validate required fields
        if (
            !jobId ||
            !sanitizedName ||
            !sanitizedEmail ||
            !sanitizedPhone ||
            !cvFile
        ) {
            return NextResponse.json(
                { error: "All required fields are required" },
                { status: 400 },
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(sanitizedEmail)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 },
            );
        }

        // Validate years of experience (must be positive number)
        const yearsOfExpNum = yearsOfExperience
            ? parseFloat(yearsOfExperience)
            : null;
        if (
            yearsOfExpNum !== null &&
            (isNaN(yearsOfExpNum) || yearsOfExpNum < 0)
        ) {
            return NextResponse.json(
                { error: "Years of experience must be a positive number" },
                { status: 400 },
            );
        }

        // Validate expected salary (must be positive number)
        const expectedSalaryNum = expectedSalary
            ? parseFloat(expectedSalary)
            : null;
        if (
            expectedSalaryNum !== null &&
            (isNaN(expectedSalaryNum) || expectedSalaryNum < 0)
        ) {
            return NextResponse.json(
                { error: "Expected salary must be a positive number" },
                { status: 400 },
            );
        }

        // Get job title
        const job = await Job.findById(jobId);
        if (!job) {
            return NextResponse.json(
                { error: "Job not found" },
                { status: 404 },
            );
        }

        // Convert file to buffer
        const cvBuffer = Buffer.from(await cvFile.arrayBuffer());
        const cvData = {
            data: cvBuffer,
            contentType: cvFile.type,
            filename: cvFile.name,
        };

        const application = await JobApplication.create({
            jobId,
            jobTitle: job.title,
            name: sanitizedName,
            email: sanitizedEmail,
            phone: sanitizedPhone,
            cv: cvData,
            country: sanitizedCountry,
            state: sanitizedState,
            yearsOfExperience: yearsOfExpNum,
            lastCompanyWorked: sanitizedLastCompanyWorked,
            expectedSalary: expectedSalaryNum,
            commentQuestion: sanitizedCommentQuestion,
        });

        return NextResponse.json(application, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to submit application" },
            { status: 500 },
        );
    }
}
