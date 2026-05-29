"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("jobs");
    const [jobs, setJobs] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [applications, setApplications] = useState([]);
    const [showJobForm, setShowJobForm] = useState(false);
    const [showAdminForm, setShowAdminForm] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [jobFormData, setJobFormData] = useState({
        title: "",
        description: "",
        location: "",
        type: "",
        expiryDate: "",
    });
    const [adminFormData, setAdminFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/admin/login");
        } else {
            fetchJobs();
            fetchAdmins();
            fetchApplications();
        }
    }, [session, status, router]);

    const fetchJobs = async () => {
        const res = await fetch("/api/jobs");
        if (res.ok) {
            const data = await res.json();
            setJobs(data);
        }
    };

    const fetchAdmins = async () => {
        const res = await fetch("/api/admins");
        if (res.ok) {
            const data = await res.json();
            setAdmins(data);
        }
    };

    const fetchApplications = async () => {
        const res = await fetch("/api/job-applications");
        if (res.ok) {
            const data = await res.json();
            setApplications(data);
        }
    };

    const handleJobSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const method = editingJob ? "PUT" : "POST";
        const url = editingJob ? `/api/jobs/${editingJob._id}` : "/api/jobs";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(jobFormData),
        });

        if (res.ok) {
            setShowJobForm(false);
            setEditingJob(null);
            setJobFormData({
                title: "",
                description: "",
                location: "",
                type: "",
                expiryDate: "",
            });
            fetchJobs();
        } else {
            const data = await res.json();
            setError(data.error || "Failed to save job");
        }
        setLoading(false);
    };

    const handleAdminSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch("/api/admins", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(adminFormData),
        });

        if (res.ok) {
            setShowAdminForm(false);
            setAdminFormData({
                name: "",
                email: "",
                password: "",
            });
            fetchAdmins();
        } else {
            const data = await res.json();
            setError(data.error || "Failed to create admin");
        }
        setLoading(false);
    };

    const handleEditJob = (job) => {
        setEditingJob(job);
        setJobFormData({
            title: job.title,
            description: job.description,
            location: job.location,
            type: job.type,
            expiryDate: new Date(job.expiryDate).toISOString().slice(0, 16),
        });
        setShowJobForm(true);
    };

    const handleDeleteJob = async (id) => {
        if (confirm("Are you sure you want to delete this job?")) {
            const res = await fetch(`/api/jobs/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (res.ok) {
                fetchJobs();
            } else {
                alert("Failed to delete job");
            }
        }
    };

    if (status === "loading") return <div>Loading...</div>;
    if (!session) return null;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">
                                Admin Dashboard
                            </h1>
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-600 mr-4">
                                Welcome, {session.user.email}
                            </span>
                            <button
                                onClick={() => signOut()}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {/* Tabs */}
                    <div className="mb-6">
                        <nav className="flex space-x-8">
                            <button
                                onClick={() => setActiveTab("jobs")}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === "jobs"
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                Jobs
                            </button>
                            <button
                                onClick={() => setActiveTab("admins")}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === "admins"
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                Admins
                            </button>
                            <button
                                onClick={() => setActiveTab("applications")}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === "applications"
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                Applications
                            </button>
                        </nav>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    {/* Jobs Tab */}
                    {activeTab === "jobs" && (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">
                                    Job Listings
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowJobForm(!showJobForm);
                                        setEditingJob(null);
                                        setJobFormData({
                                            title: "",
                                            description: "",
                                            location: "",
                                            type: "",
                                            expiryDate: "",
                                        });
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    {showJobForm ? "Cancel" : "Add New Job"}
                                </button>
                            </div>

                            {showJobForm && (
                                <form
                                    onSubmit={handleJobSubmit}
                                    className="bg-white p-6 rounded shadow mb-6"
                                >
                                    <h3 className="text-lg font-medium mb-4">
                                        {editingJob
                                            ? "Edit Job"
                                            : "Add New Job"}
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={jobFormData.title}
                                                onChange={(e) =>
                                                    setJobFormData({
                                                        ...jobFormData,
                                                        title: e.target.value,
                                                    })
                                                }
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={jobFormData.location}
                                                onChange={(e) =>
                                                    setJobFormData({
                                                        ...jobFormData,
                                                        location:
                                                            e.target.value,
                                                    })
                                                }
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Type
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={jobFormData.type}
                                                onChange={(e) =>
                                                    setJobFormData({
                                                        ...jobFormData,
                                                        type: e.target.value,
                                                    })
                                                }
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="datetime-local"
                                                required
                                                value={jobFormData.expiryDate}
                                                onChange={(e) =>
                                                    setJobFormData({
                                                        ...jobFormData,
                                                        expiryDate:
                                                            e.target.value,
                                                    })
                                                }
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <textarea
                                                required
                                                value={jobFormData.description}
                                                onChange={(e) =>
                                                    setJobFormData({
                                                        ...jobFormData,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                                rows={4}
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
                                        >
                                            {loading
                                                ? "Saving..."
                                                : editingJob
                                                  ? "Update Job"
                                                  : "Create Job"}
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                <ul className="divide-y divide-gray-200">
                                    {jobs.map((job) => (
                                        <li key={job._id} className="px-6 py-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {job.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {job.location} -{" "}
                                                        {job.type}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Posted by:{" "}
                                                        {job.createdBy}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Posted on:{" "}
                                                        {new Date(
                                                            job.createdAt,
                                                        ).toLocaleDateString()}{" "}
                                                        at{" "}
                                                        {new Date(
                                                            job.createdAt,
                                                        ).toLocaleTimeString()}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Expires:{" "}
                                                        {new Date(
                                                            job.expiryDate,
                                                        ).toLocaleDateString()}
                                                    </p>
                                                    <p
                                                        className={`text-sm ${job.isActive ? "text-green-600" : "text-red-600"}`}
                                                    >
                                                        {job.isActive
                                                            ? "Active"
                                                            : "Expired"}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEditJob(job)
                                                        }
                                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteJob(
                                                                job._id,
                                                            )
                                                        }
                                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}

                    {/* Admins Tab */}
                    {activeTab === "admins" && (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">
                                    Admin Users
                                </h2>
                                <button
                                    onClick={() =>
                                        setShowAdminForm(!showAdminForm)
                                    }
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    {showAdminForm ? "Cancel" : "Add New Admin"}
                                </button>
                            </div>

                            {showAdminForm && (
                                <form
                                    onSubmit={handleAdminSubmit}
                                    className="bg-white p-6 rounded shadow mb-6"
                                >
                                    <h3 className="text-lg font-medium mb-4">
                                        Add New Admin
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={adminFormData.name}
                                                onChange={(e) =>
                                                    setAdminFormData({
                                                        ...adminFormData,
                                                        name: e.target.value,
                                                    })
                                                }
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={adminFormData.email}
                                                onChange={(e) =>
                                                    setAdminFormData({
                                                        ...adminFormData,
                                                        email: e.target.value,
                                                    })
                                                }
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                placeholder="admin@aavabrands.com"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Must end with @aavabrands.com
                                            </p>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                required
                                                value={adminFormData.password}
                                                onChange={(e) =>
                                                    setAdminFormData({
                                                        ...adminFormData,
                                                        password:
                                                            e.target.value,
                                                    })
                                                }
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
                                        >
                                            {loading
                                                ? "Creating..."
                                                : "Create Admin"}
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                <ul className="divide-y divide-gray-200">
                                    {admins.map((admin) => (
                                        <li
                                            key={admin._id}
                                            className="px-6 py-4"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {admin.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {admin.email}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Created:{" "}
                                                        {new Date(
                                                            admin.createdAt,
                                                        ).toLocaleDateString()}
                                                    </p>
                                                    {admin.isDefault && (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            Default Admin
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}

                    {/* Applications Tab */}
                    {activeTab === "applications" && (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">
                                    Job Applications
                                </h2>
                            </div>

                            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                <ul className="divide-y divide-gray-200">
                                    {applications.map((application) => (
                                        <li
                                            key={application._id}
                                            className="px-6 py-4"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {application.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Email:{" "}
                                                        {application.email}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Phone:{" "}
                                                        {application.phone}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Job Applied:{" "}
                                                        {application.jobTitle}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Applied on:{" "}
                                                        {new Date(
                                                            application.createdAt,
                                                        ).toLocaleDateString()}{" "}
                                                        at{" "}
                                                        {new Date(
                                                            application.createdAt,
                                                        ).toLocaleTimeString()}
                                                    </p>
                                                    {application.cv && (
                                                        <p className="text-sm text-gray-500">
                                                            CV:{" "}
                                                            {
                                                                application.cv
                                                                    .filename
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex space-x-2">
                                                    {application.cv && (
                                                        <button
                                                            onClick={() => {
                                                                // Download CV
                                                                const link =
                                                                    document.createElement(
                                                                        "a",
                                                                    );
                                                                link.href = `/api/job-applications/${application._id}/cv`;
                                                                link.download =
                                                                    application
                                                                        .cv
                                                                        .filename ||
                                                                    `cv-${application._id}.pdf`;
                                                                document.body.appendChild(
                                                                    link,
                                                                );
                                                                link.click();
                                                                document.body.removeChild(
                                                                    link,
                                                                );
                                                            }}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                                        >
                                                            Download CV
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
