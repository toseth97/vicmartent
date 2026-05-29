"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FaFileAlt,
  FaEye,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaTimes,
  FaFilter,
} from "react-icons/fa";

interface Application {
  _id: string;
  vacancyId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  cvUrl?: string;
  cvFilename?: string;
  country?: string;
  state?: string;
  yearsOfExperience?: string;
  lastCompanyWorked?: string;
  expectedSalary?: string;
  status: string;
  notes?: string;
  createdAt: string;
}

const statusOptions = ["pending", "reviewed", "shortlisted", "rejected", "hired"];

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    reviewed: "bg-blue-100 text-blue-700",
    shortlisted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    hired: "bg-emerald-100 text-emerald-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [updating, setUpdating] = useState(false);

  const fetchApplications = useCallback(async () => {
    try {
      const res = await fetch("/api/applications");
      if (res.ok) {
        const data = await res.json();
        setApplications(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(true);
    try {
      const res = await fetch("/api/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        fetchApplications();
        if (selectedApp?._id === id) {
          setSelectedApp({ ...selectedApp, status });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdating(false);
    }
  };

  const filteredApplications =
    statusFilter === "all"
      ? applications
      : applications.filter((a) => a.status === statusFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bebas text-primary tracking-wide">
          Applications
        </h1>
        <p className="text-gray-500 text-sm">
          Review and manage job applications
        </p>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            statusFilter === "all"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All ({applications.length})
        </button>
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
              statusFilter === status
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {status} ({applications.filter((a) => a.status === status).length})
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-2 space-y-3">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="h-5 skeleton w-1/3 mb-3" />
                <div className="h-4 skeleton w-full mb-2" />
                <div className="h-4 skeleton w-2/3" />
              </div>
            ))
          ) : filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <div
                key={app._id}
                onClick={() => setSelectedApp(app)}
                className={`bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                  selectedApp?._id === app._id
                    ? "border-primary ring-2 ring-primary/10"
                    : "border-gray-100"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {app.name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <p className="text-xs text-accent font-medium">
                      {app.jobTitle}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaEnvelope className="w-3 h-3" /> {app.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaPhone className="w-3 h-3" /> {app.phone}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
              <FaFileAlt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bebas text-primary tracking-wide mb-1">
                No Applications
              </h3>
              <p className="text-gray-500 text-sm">
                Applications will appear here when candidates apply for vacancies.
              </p>
            </div>
          )}
        </div>

        {/* Application Detail */}
        <div className="lg:col-span-1">
          {selectedApp ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bebas text-primary tracking-wide">
                  Application Details
                </h2>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedApp.name}
                  </p>
                  <p className="text-xs text-accent font-medium">
                    {selectedApp.jobTitle}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaEnvelope className="w-3.5 h-3.5 text-gray-400" />
                    {selectedApp.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaPhone className="w-3.5 h-3.5 text-gray-400" />
                    {selectedApp.phone}
                  </div>
                  {(selectedApp.country || selectedApp.state) && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaMapMarkerAlt className="w-3.5 h-3.5 text-gray-400" />
                      {[selectedApp.state, selectedApp.country].filter(Boolean).join(", ")}
                    </div>
                  )}
                  {selectedApp.yearsOfExperience && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaBriefcase className="w-3.5 h-3.5 text-gray-400" />
                      {selectedApp.yearsOfExperience} years experience
                    </div>
                  )}
                  {selectedApp.lastCompanyWorked && (
                    <p className="text-gray-600 text-xs">
                      Previous: {selectedApp.lastCompanyWorked}
                    </p>
                  )}
                  {selectedApp.expectedSalary && (
                    <p className="text-xs">
                      <span className="text-gray-400">Expected:</span>{" "}
                      <span className="text-accent font-medium">
                        {selectedApp.expectedSalary}
                      </span>
                    </p>
                  )}
                </div>

                {selectedApp.coverLetter && (
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">
                      Cover Letter
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-6">
                      {selectedApp.coverLetter}
                    </p>
                  </div>
                )}

                {selectedApp.cvUrl && (
                  <a
                    href={selectedApp.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2.5 text-center text-xs font-medium bg-primary/5 text-primary rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    View CV / Resume
                  </a>
                )}

                {/* Status Update */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Update Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedApp._id, status)}
                        disabled={updating}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                          selectedApp.status === status
                            ? getStatusColor(status)
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        } disabled:opacity-50`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
              <FaEye className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">
                Select an application to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
