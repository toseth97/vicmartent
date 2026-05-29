"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaBriefcase,
  FaFileAlt,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaShieldAlt,
} from "react-icons/fa";
import { signOut } from "next-auth/react";

const sidebarItems = [
  { href: "/admin/dashboard", icon: FaHome, label: "Dashboard" },
  { href: "/admin/directors", icon: FaUsers, label: "Directors" },
  { href: "/admin/events", icon: FaCalendarAlt, label: "Events" },
  { href: "/admin/vacancies", icon: FaBriefcase, label: "Vacancies" },
  { href: "/admin/applications", icon: FaFileAlt, label: "Applications" },
  { href: "/admin/inquiries", icon: FaEnvelope, label: "Inquiries" },
  { href: "/admin/settings", icon: FaCog, label: "Settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Redirect to login if not authenticated (except for login page)
  useEffect(() => {
    if (status === "unauthenticated" && !pathname.includes("/admin/login")) {
      router.push("/admin/login");
    }
  }, [status, pathname, router]);

  // Don't show sidebar on login page
  if (pathname.includes("/admin/login")) {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-primary z-50 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${sidebarCollapsed ? "w-20" : "w-64"}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {!sidebarCollapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <FaShieldAlt className="w-6 h-6 text-accent" />
              <span className="text-white font-bebas text-xl tracking-wider">
                Vicmart Admin
              </span>
            </Link>
          )}
          {sidebarCollapsed && (
            <Link href="/admin/dashboard" className="mx-auto">
              <FaShieldAlt className="w-6 h-6 text-accent" />
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-accent transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="py-4 flex-1">
          <ul className="space-y-1 px-3">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`admin-sidebar-item ${
                      isActive ? "active bg-white/20 text-white" : "text-white/70 hover:text-white"
                    }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info & Logout */}
        <div className="border-t border-white/10 p-4">
          {!sidebarCollapsed && session.user && (
            <div className="mb-3">
              <p className="text-white text-sm font-medium truncate">
                {session.user.name}
              </p>
              <p className="text-white/50 text-xs truncate">
                {session.user.email}
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full capitalize">
                {session.user.role}
              </span>
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="admin-sidebar-item text-red-300 hover:text-red-200 hover:bg-red-500/10 w-full"
          >
            <FaSignOutAlt className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-primary transition-colors"
            >
              <FaBars className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <FaChevronLeft
                className={`w-4 h-4 transition-transform duration-300 ${
                  sidebarCollapsed ? "rotate-180" : ""
                }`}
              />
            </button>
            <h1 className="text-lg font-semibold text-primary hidden sm:block">
              {sidebarItems.find((item) => item.href === pathname)?.label || "Admin"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              View Site
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
