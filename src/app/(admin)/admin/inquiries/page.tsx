"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaReply,
  FaTrash,
  FaFilter,
  FaSearch,
  FaTimes,
  FaUser,
  FaTag,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaPaperPlane,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  category: string;
  status: string;
  isRead: boolean;
  repliedBy?: string;
  replyMessage?: string;
  createdAt: string;
  updatedAt: string;
}

const statusOptions = ["new", "read", "replied", "closed"];

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700 border-blue-200",
    read: "bg-yellow-100 text-yellow-700 border-yellow-200",
    replied: "bg-green-100 text-green-700 border-green-200",
    closed: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

const getStatusIcon = (status: string) => {
  const icons: Record<string, React.ReactNode> = {
    new: <FaEnvelope className="w-3 h-3" />,
    read: <FaEnvelopeOpen className="w-3 h-3" />,
    replied: <FaReply className="w-3 h-3" />,
    closed: <FaCheckCircle className="w-3 h-3" />,
  };
  return icons[status] || <FaEnvelope className="w-3 h-3" />;
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    general: "bg-slate-100 text-slate-700",
    partnership: "bg-purple-100 text-purple-700",
    careers: "bg-blue-100 text-blue-700",
    products: "bg-emerald-100 text-emerald-700",
    complaint: "bg-red-100 text-red-700",
  };
  return colors[category] || "bg-gray-100 text-gray-700";
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    try {
      const res = await fetch("/api/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.data || data || []);
      }
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: true, status: "read" }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) =>
            inq._id === id ? { ...inq, isRead: true, status: "read" } : inq
          )
        );
        if (selectedInquiry?._id === id) {
          setSelectedInquiry((prev) =>
            prev ? { ...prev, isRead: true, status: "read" } : null
          );
        }
      }
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq._id === id ? { ...inq, status } : inq))
        );
        if (selectedInquiry?._id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const sendReply = async () => {
    if (!selectedInquiry || !replyText.trim()) return;
    setSendingReply(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedInquiry._id,
          replyMessage: replyText.trim(),
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setInquiries((prev) =>
          prev.map((inq) =>
            inq._id === selectedInquiry._id
              ? {
                  ...inq,
                  status: "replied",
                  replyMessage: replyText.trim(),
                  repliedBy: updated.repliedBy || "Admin",
                }
              : inq
          )
        );
        setSelectedInquiry((prev) =>
          prev
            ? {
                ...prev,
                status: "replied",
                replyMessage: replyText.trim(),
                repliedBy: updated.repliedBy || "Admin",
              }
            : null
        );
        setReplyText("");
        setShowReplyBox(false);
      }
    } catch (err) {
      console.error("Failed to send reply:", err);
    } finally {
      setSendingReply(false);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq._id !== id));
        if (selectedInquiry?._id === id) {
          setSelectedInquiry(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  const handleSelectInquiry = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setShowReplyBox(false);
    setReplyText("");
    if (!inq.isRead) {
      markAsRead(inq._id);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || inq.category === categoryFilter;
    const matchesSearch =
      searchTerm === "" ||
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const statusCounts = inquiries.reduce(
    (acc, inq) => {
      acc[inq.status] = (acc[inq.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Skeleton loading
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-3 flex-wrap">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-9 w-24 bg-gray-200 rounded-full animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-24 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
          <div className="h-96 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Inquiries</h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage and respond to customer inquiries
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
            {inquiries.filter((i) => i.status === "new").length} New
          </span>
          <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
            {inquiries.filter((i) => i.status === "replied").length} Replied
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
        {/* Status filter tabs */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === "all"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All ({inquiries.length})
          </button>
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                statusFilter === status
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status} ({statusCounts[status] || 0})
            </button>
          ))}
        </div>

        {/* Category filter and search */}
        <div className="flex gap-3 flex-wrap items-center">
          <div className="relative flex-1 min-w-[200px]">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
          >
            <option value="all">All Categories</option>
            <option value="general">General</option>
            <option value="partnership">Partnership</option>
            <option value="careers">Careers</option>
            <option value="products">Products</option>
            <option value="complaint">Complaint</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiry List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredInquiries.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <FaEnvelope className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No inquiries found
              </h3>
              <p className="text-gray-400 text-sm">
                {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Inquiries from the contact form will appear here"}
              </p>
            </div>
          ) : (
            filteredInquiries.map((inq) => (
              <div
                key={inq._id}
                onClick={() => handleSelectInquiry(inq)}
                className={`bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedInquiry?._id === inq._id
                    ? "border-primary shadow-md ring-1 ring-primary/20"
                    : inq.isRead
                    ? "border-gray-200"
                    : "border-blue-200 bg-blue-50/30"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!inq.isRead && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      )}
                      <h4
                        className={`text-sm font-semibold truncate ${
                          !inq.isRead ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {inq.subject}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <FaUser className="w-3 h-3" />
                        {inq.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        {formatDate(inq.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {inq.message}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        inq.status
                      )}`}
                    >
                      {getStatusIcon(inq.status)}
                      {inq.status}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(
                        inq.category
                      )}`}
                    >
                      <FaTag className="w-2.5 h-2.5" />
                      {inq.category}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          {selectedInquiry ? (
            <div className="bg-white rounded-xl border border-gray-200 sticky top-20">
              {/* Detail Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-primary text-lg truncate pr-2">
                    {selectedInquiry.subject}
                  </h3>
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      selectedInquiry.status
                    )}`}
                  >
                    {getStatusIcon(selectedInquiry.status)}
                    {selectedInquiry.status}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(
                      selectedInquiry.category
                    )}`}
                  >
                    <FaTag className="w-2.5 h-2.5" />
                    {selectedInquiry.category}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="p-4 border-b border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <FaUser className="w-3.5 h-3.5 text-gray-400" />
                  <span className="font-medium text-gray-800">
                    {selectedInquiry.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaEnvelope className="w-3.5 h-3.5 text-gray-400" />
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="text-primary hover:underline"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaSearch className="w-3.5 h-3.5 text-gray-400" />
                    {selectedInquiry.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <FaClock className="w-3 h-3" />
                  {formatDate(selectedInquiry.createdAt)}
                </div>
              </div>

              {/* Message */}
              <div className="p-4 border-b border-gray-100">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Message
                </h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message}
                </p>
              </div>

              {/* Reply */}
              {selectedInquiry.replyMessage && (
                <div className="p-4 border-b border-gray-100 bg-green-50/50">
                  <h4 className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <FaReply className="w-3 h-3" />
                    Reply from {selectedInquiry.repliedBy || "Admin"}
                  </h4>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedInquiry.replyMessage}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="p-4 space-y-3">
                {/* Status Buttons */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                    Change Status
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {statusOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selectedInquiry._id, s)}
                        disabled={selectedInquiry.status === s}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                          selectedInquiry.status === s
                            ? getStatusColor(s) + " ring-1 ring-offset-1"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reply Button */}
                {selectedInquiry.status !== "closed" && (
                  <button
                    onClick={() => setShowReplyBox(!showReplyBox)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <FaReply className="w-3.5 h-3.5" />
                    {showReplyBox ? "Cancel Reply" : "Reply to Inquiry"}
                  </button>
                )}

                {/* Reply Text Area */}
                {showReplyBox && (
                  <div className="space-y-3">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply here..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    />
                    <button
                      onClick={sendReply}
                      disabled={!replyText.trim() || sendingReply}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaPaperPlane className="w-3.5 h-3.5" />
                      {sendingReply ? "Sending..." : "Send Reply"}
                    </button>
                  </div>
                )}

                {/* Delete Button */}
                <button
                  onClick={() => deleteInquiry(selectedInquiry._id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  <FaTrash className="w-3.5 h-3.5" />
                  Delete Inquiry
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center sticky top-20">
              <FaEnvelope className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Select an Inquiry
              </h3>
              <p className="text-gray-400 text-sm">
                Click on an inquiry from the list to view details and reply
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
