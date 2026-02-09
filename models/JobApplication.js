import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        jobTitle: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        cv: {
            data: Buffer,
            contentType: String,
            filename: String,
        },
        country: {
            type: String,
        },
        state: {
            type: String,
        },
        yearsOfExperience: {
            type: Number,
            min: [0, "Years of experience must be a positive number"],
        },
        lastCompanyWorked: {
            type: String,
        },
        expectedSalary: {
            type: Number,
            min: [0, "Expected salary must be a positive number"],
        },
        commentQuestion: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.models.JobApplication ||
    mongoose.model("JobApplication", JobApplicationSchema);
