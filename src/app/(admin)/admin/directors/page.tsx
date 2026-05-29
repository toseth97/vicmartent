"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaUpload,
  FaLinkedin,
  FaTwitter,
  FaEye,
  FaEyeSlash,
  FaUsers,
} from "react-icons/fa";

interface Director {
  _id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  linkedinUrl?: string;
  twitterUrl?: string;
}

const defaultForm = {
  name: "",
  position: "",
  bio: "",
  imageUrl: "",
  order: 0,
  isActive: true,
  linkedinUrl: "",
  twitterUrl: "",
};

export default function AdminDirectorsPage() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchDirectors = useCallback(async () => {
    try {
      const res = await fetch("/api/directors");
      if (res.ok) {
        const data = await res.json();
        setDirectors(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch directors:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDirectors();
  }, [fetchDirectors]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(defaultForm);
    setError("");
    setShowModal(true);
  };

  const openEditModal = (director: Director) => {
    setEditingId(director._id);
    setForm({
      name: director.name,
      position: director.position,
      bio: director.bio,
      imageUrl: director.imageUrl,
      order: director.order,
      isActive: director.isActive,
      linkedinUrl: director.linkedinUrl || "",
      twitterUrl: director.twitterUrl || "",
    });
    setError("");
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const url = "/api/directors";
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...form, id: editingId } : form;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setShowModal(false);
        fetchDirectors();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save director");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this director?")) return;

    try {
      const res = await fetch("/api/directors", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchDirectors();
      }
    } catch (err) {
      console.error("Failed to delete director:", err);
    }
  };

  const toggleActive = async (director: Director) => {
    try {
      const res = await fetch("/api/directors", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: director._id,
          name: director.name,
          position: director.position,
          bio: director.bio,
          imageUrl: director.imageUrl,
          order: director.order,
          isActive: !director.isActive,
          linkedinUrl: director.linkedinUrl,
          twitterUrl: director.twitterUrl,
        }),
      });

      if (res.ok) {
        fetchDirectors();
      }
    } catch (err) {
      console.error("Failed to update director:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bebas text-primary tracking-wide">
            Directors
          </h1>
          <p className="text-gray-500 text-sm">
            Manage board of directors displayed on the website
          </p>
        </div>
        <button onClick={openCreateModal} className="btn-primary text-sm flex items-center gap-2">
          <FaPlus className="w-3 h-3" /> Add Director
        </button>
      </div>

      {/* Directors Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full skeleton" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 skeleton w-2/3" />
                  <div className="h-3 skeleton w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : directors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {directors.map((director) => (
            <div
              key={director._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                    {director.imageUrl ? (
                      <Image
                        src={director.imageUrl}
                        alt={director.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg font-bold">
                        {director.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {director.name}
                    </h3>
                    <p className="text-xs text-accent font-medium truncate">
                      {director.position}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {director.bio}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-50">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      director.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {director.isActive ? "Active" : "Inactive"}
                  </span>
                  <span className="text-xs text-gray-400">Order: {director.order}</span>
                  {(director.linkedinUrl || director.twitterUrl) && (
                    <div className="flex gap-1 ml-auto">
                      {director.linkedinUrl && (
                        <FaLinkedin className="w-3 h-3 text-blue-500" />
                      )}
                      {director.twitterUrl && (
                        <FaTwitter className="w-3 h-3 text-blue-400" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex border-t border-gray-100">
                <button
                  onClick={() => toggleActive(director)}
                  className="flex-1 py-2.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  {director.isActive ? (
                    <>
                      <FaEyeSlash className="w-3 h-3" /> Hide
                    </>
                  ) : (
                    <>
                      <FaEye className="w-3 h-3" /> Show
                    </>
                  )}
                </button>
                <button
                  onClick={() => openEditModal(director)}
                  className="flex-1 py-2.5 text-xs text-blue-600 hover:bg-blue-50 transition-colors border-l border-gray-100 flex items-center justify-center gap-1.5"
                >
                  <FaEdit className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(director._id)}
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
          <FaUsers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bebas text-primary tracking-wide mb-1">
            No Directors Yet
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Add directors to display on the About page.
          </p>
          <button onClick={openCreateModal} className="btn-primary text-sm">
            Add First Director
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bebas text-primary tracking-wide">
                {editingId ? "Edit Director" : "Add Director"}
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
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position *
                </label>
                <input
                  type="text"
                  required
                  value={form.position}
                  onChange={(e) =>
                    setForm({ ...form, position: e.target.value })
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
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
                  placeholder="/assets/images/director.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) =>
                      setForm({ ...form, order: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) =>
                        setForm({ ...form, isActive: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={form.linkedinUrl}
                  onChange={(e) =>
                    setForm({ ...form, linkedinUrl: e.target.value })
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter URL
                </label>
                <input
                  type="url"
                  value={form.twitterUrl}
                  onChange={(e) =>
                    setForm({ ...form, twitterUrl: e.target.value })
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

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
