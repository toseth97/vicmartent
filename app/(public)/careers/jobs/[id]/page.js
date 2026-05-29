"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Bebas_Neue } from "next/font/google";
import { Poppins } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export default function JobDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        cv: null,
        country: "",
        state: "",
        yearsOfExperience: "",
        lastCompanyWorked: "",
        expectedSalary: "",
        commentQuestion: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        fetchJob();
    }, [id]);

    const fetchJob = async () => {
        try {
            const res = await fetch(`/api/jobs`);
            if (res.ok) {
                const jobs = await res.json();
                const foundJob = jobs.find((j) => j._id === id);
                if (foundJob && foundJob.isActive) {
                    setJob(foundJob);
                } else {
                    router.push("/careers/jobs");
                }
            }
        } catch (error) {
            console.error("Failed to fetch job:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("jobId", id);
            formDataToSend.append("name", formData.name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("phone", formData.phone);
            if (formData.cv) {
                formDataToSend.append("cv", formData.cv);
            }
            formDataToSend.append("country", formData.country);
            formDataToSend.append("state", formData.state);
            formDataToSend.append(
                "yearsOfExperience",
                formData.yearsOfExperience,
            );
            formDataToSend.append(
                "lastCompanyWorked",
                formData.lastCompanyWorked,
            );
            formDataToSend.append("expectedSalary", formData.expectedSalary);
            formDataToSend.append("commentQuestion", formData.commentQuestion);

            const res = await fetch("/api/job-applications", {
                method: "POST",
                body: formDataToSend,
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                const data = await res.json();
                setError(data.error || "Failed to submit application");
            }
        } catch (error) {
            setError("Failed to submit application");
        } finally {
            setSubmitting(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setFormData({ ...formData, cv: file });
        } else {
            alert("Please select a PDF file");
            e.target.value = "";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center justify-center py-12">
                    <div className="flex items-center space-x-2">
                        <svg
                            className="animate-spin h-8 w-8 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <span className="text-xl text-gray-600">
                            Loading...
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Job not found</div>
            </div>
        );
    }

    if (submitted) {
        return (
            <main
                className={`min-h-screen bg-gray-50 py-16 ${poppins.className} `}
            >
                <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow rounded-lg p-6 text-center">
                        <div className="mb-6">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                <svg
                                    className="h-6 w-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                            </div>
                            <h2 className="mt-4 text-2xl font-bold text-gray-900">
                                Application Submitted Successfully!
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Thank you for applying. We will review your
                                application and get back to you soon.
                            </p>
                        </div>
                        <button
                            onClick={() => router.push("/careers/jobs")}
                            className="px-6 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Back to Job Listings
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className={`min-h-screen bg-gray-50 py-16 ${poppins.className} `}>
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Job Details */}
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h1
                        className={`text-3xl font-bold text-gray-900 mb-4 ${bebas.className}`}
                    >
                        {job.title}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <span className="text-sm font-medium text-gray-500">
                                Location
                            </span>
                            <p className="text-lg text-gray-900">
                                {job.location}
                            </p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500">
                                Type
                            </span>
                            <p className="text-lg text-gray-900">{job.type}</p>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-500">
                                Application Deadline
                            </span>
                            <p className="text-lg text-gray-900">
                                {new Date(job.expiryDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Job Description
                        </h2>
                        <p className="text-gray-700 whitespace-pre-line">
                            {job.description}
                        </p>
                    </div>
                </div>

                {/* Application Form */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Apply for this position
                    </h2>

                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phone: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                CV/Resume (PDF only) *
                            </label>
                            <input
                                type="file"
                                accept=".pdf"
                                required
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Please upload your CV in PDF format
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    value={formData.country}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            country: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State
                                </label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            state: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Years of Experience
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.yearsOfExperience}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            yearsOfExperience: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Company Worked
                                </label>
                                <input
                                    type="text"
                                    value={formData.lastCompanyWorked}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            lastCompanyWorked: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expected Salary
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.expectedSalary}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        expectedSalary: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Comment/Question
                            </label>
                            <textarea
                                rows="4"
                                value={formData.commentQuestion}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        commentQuestion: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => router.push("/careers/jobs")}
                                className="mr-4 px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {submitting
                                    ? "Submitting..."
                                    : "Submit Application"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
