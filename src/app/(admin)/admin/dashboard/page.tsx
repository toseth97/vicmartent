"use client";

import React, { useState, useEffect } from "react";
import {
  FaBriefcase,
  FaFileAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaClock,
  FaCog,
} from "react-icons/fa";
import Link from "next/link";

interface DashboardStats {
  vacancies: number;
  applications: number;
  inquiries: number;
  events: number;
  directors: number;
  recentApplications: Array<{
    _id: string;
    name: string;
    jobTitle: string;
    createdAt: string;
    status: string;
  }>;
  recentInquiries: Array<{
    _id: string;
    name: string;
    subject: string;
    createdAt: string;
    isRead: boolean;
  }>;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Vacancies",
      value: stats?.vacancies || 0,
      icon: FaBriefcase,
      color: "bg-blue-500",
      href: "/admin/vacancies",
    },
    {
      label: "Applications",
      value: stats?.applications || 0,
      icon: FaFileAlt,
      color: "bg-green-500",
      href: "/admin/applications",
    },
    {
      label: "Inquiries",
      value: stats?.inquiries || 0,
      icon: FaEnvelope,
      color: "bg-purple-500",
      href: "/admin/inquiries",
    },
    {
      label: "Events",
      value: stats?.events || 0,
      icon: FaCalendarAlt,
      color: "bg-accent",
      href: "/admin/events",
    },
    {
      label: "Directors",
      value: stats?.directors || 0,
      icon: FaUsers,
      color: "bg-red-500",
      href: "/admin/directors",
    },
  ];

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      reviewed: "bg-blue-100 text-blue-700",
      shortlisted: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      hired: "bg-emerald-100 text-emerald-700",
    };
    return (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
          colors[status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bebas text-primary tracking-wide">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Overview of your website content and activity
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}
              >
                <card.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-primary">
              {loading ? (
                <span className="inline-block w-12 h-7 bg-gray-100 animate-pulse rounded" />
              ) : (
                card.value
              )}
            </p>
            <p className="text-gray-500 text-sm">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bebas text-primary tracking-wide">
              Recent Applications
            </h2>
            <Link
              href="/admin/applications"
              className="text-accent text-sm hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full skeleton" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 skeleton w-1/3" />
                    <div className="h-3 skeleton w-1/2" />
                  </div>
                </div>
              ))
            ) : stats?.recentApplications && stats.recentApplications.length > 0 ? (
              stats.recentApplications.map((app) => (
                <div key={app._id} className="p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center">
                    <FaFileAlt className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {app.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {app.jobTitle}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {getStatusBadge(app.status)}
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <FaClock className="w-2.5 h-2.5" />
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <FaFileAlt className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No applications yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bebas text-primary tracking-wide">
              Recent Inquiries
            </h2>
            <Link
              href="/admin/inquiries"
              className="text-accent text-sm hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full skeleton" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 skeleton w-1/3" />
                    <div className="h-3 skeleton w-1/2" />
                  </div>
                </div>
              ))
            ) : stats?.recentInquiries && stats.recentInquiries.length > 0 ? (
              stats.recentInquiries.map((inquiry) => (
                <div key={inquiry._id} className="p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                    <FaEnvelope className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {inquiry.name}
                      </p>
                      {!inquiry.isRead && (
                        <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {inquiry.subject}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <FaClock className="w-2.5 h-2.5" />
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <FaEnvelope className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No inquiries yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-lg font-bebas text-primary tracking-wide mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/admin/directors"
            className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <FaUsers className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Add Director</span>
          </Link>
          <Link
            href="/admin/events"
            className="flex items-center gap-3 p-4 bg-accent/5 rounded-lg hover:bg-accent/10 transition-colors"
          >
            <FaCalendarAlt className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-primary">Post Event</span>
          </Link>
          <Link
            href="/admin/vacancies"
            className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <FaBriefcase className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-primary">New Vacancy</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <FaCog className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-primary">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
