"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTag,
} from "react-icons/fa";

interface Event {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  location: string;
  category: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

const categories = [
  { value: "corporate", label: "Corporate" },
  { value: "csr", label: "CSR" },
  { value: "awards", label: "Awards" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

const defaultForm = {
  title: "",
  description: "",
  imageUrl: "",
  date: "",
  location: "",
  category: "corporate",
  isActive: true,
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch("/api/events?limit=50");
      if (res.ok) {
        const data = await res.json();
        setEvents(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch events:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(defaultForm);
    setError("");
    setShowModal(true);
  };

  const openEditModal = (event: Event) => {
    setEditingId(event._id);
    setForm({
      title: event.title,
      description: event.description,
      imageUrl: event.imageUrl,
      date: new Date(event.date).toISOString().split("T")[0],
      location: event.location,
      category: event.category,
      isActive: event.isActive,
    });
    setError("");
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...form, id: editingId } : form;

      const res = await fetch("/api/events", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setShowModal(false);
        fetchEvents();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save event");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch("/api/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchEvents();
      }
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };

  const filteredEvents =
    filterCategory === "all"
      ? events
      : events.filter((e) => e.category === filterCategory);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      corporate: "bg-blue-100 text-blue-700",
      csr: "bg-green-100 text-green-700",
      awards: "bg-yellow-100 text-yellow-700",
      partnership: "bg-purple-100 text-purple-700",
      other: "bg-gray-100 text-gray-700",
    };
    return colors[category] || colors.other;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bebas text-primary tracking-wide">
            Events
          </h1>
          <p className="text-gray-500 text-sm">
            Manage company events and announcements
          </p>
        </div>
        <button onClick={openCreateModal} className="btn-primary text-sm flex items-center gap-2">
          <FaPlus className="w-3 h-3" /> Add Event
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            filterCategory === "all"
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilterCategory(cat.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterCategory === cat.value
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Events List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="h-5 skeleton w-1/3 mb-3" />
              <div className="h-4 skeleton w-full mb-2" />
              <div className="h-4 skeleton w-2/3" />
            </div>
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="space-y-3">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {event.title}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                          event.category
                        )}`}
                      >
                        {categories.find((c) => c.value === event.category)?.label}
                      </span>
                      {!event.isActive && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="w-3 h-3" />
                        {new Date(event.date).toLocaleDateString("en-NG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt className="w-3 h-3" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex border-t border-gray-100">
                <button
                  onClick={() => openEditModal(event)}
                  className="flex-1 py-2.5 text-xs text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <FaEdit className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="flex-1 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors border-l border-gray-100 flex items-center justify-center gap-1.5"
                >
                  <FaTrash className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <FaCalendarAlt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bebas text-primary tracking-wide mb-1">
            No Events Yet
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Create events to display on the Press and CSR pages.
          </p>
          <button onClick={openCreateModal} className="btn-primary text-sm">
            Create First Event
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bebas text-primary tracking-wide">
                {editingId ? "Edit Event" : "Add Event"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="/assets/images/event.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Active (visible on website)</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 btn-primary text-sm disabled:opacity-60"
                >
                  {submitting ? "Saving..." : editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
