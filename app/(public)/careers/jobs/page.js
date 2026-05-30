"use client";
import { Bebas_Neue } from "next/font/google";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import Link from "next/link";
import CareerHero from "@/app/components/CareerHero";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const parseJobsResponse = (data) => {
        if (Array.isArray(data)) return data;
        if (data?.jobs && Array.isArray(data.jobs)) return data.jobs;
        if (data?.data && Array.isArray(data.data)) return data.data;
        console.warn("Unexpected jobs response:", data);
        return [];
    };

    const fetchJobs = async () => {
        try {
            const res = await fetch("/api/jobs");
            if (!res.ok) {
                const text = await res.text();
                console.error(
                    "Failed to fetch jobs: status",
                    res.status,
                    text,
                );
                return;
            }

            const contentType = res.headers.get("content-type") || "";
            const data = contentType.includes("application/json")
                ? await res.json()
                : JSON.parse(await res.text());

            setJobs(parseJobsResponse(data).filter((job) => job.isActive));
        } catch (error) {
            console.error(
                "Failed to fetch jobs:",
                error?.message || error,
                error,
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            className={`min-h-screen bg-gray-50 overflow-x-hidden ${bebas.className}`}
        >
            <CareerHero props="Vacancies" />

            <div
                className={`max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 ${bebas.className}`}
            >
                {loading ? (
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
                                Loading jobs...
                            </span>
                        </div>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className={`text-center ${poppins.className}`}>
                        <div className="text-xl text-gray-600">
                            No job vacancies available at the moment.
                        </div>
                    </div>
                ) : (
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${poppins.className}`}
                    >
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="p-6">
                                    <h3
                                        className={`text-xl font-bold text-gray-900 mb-2 tracking-widest`}
                                    >
                                        {job.title}
                                    </h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <span className="font-medium">
                                                Location:
                                            </span>
                                            <span className="ml-2">
                                                {job.location}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <span className="font-medium">
                                                Type:
                                            </span>
                                            <span className="ml-2">
                                                {job.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <span className="font-medium">
                                                Deadline:
                                            </span>
                                            <span className="ml-2">
                                                {new Date(
                                                    job.expiryDate,
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                                        {job.description}
                                    </p>
                                    <Link
                                        href={`/careers/jobs/${job._id}`}
                                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    >
                                        Apply Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
