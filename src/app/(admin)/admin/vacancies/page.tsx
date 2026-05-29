"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaMapMarkerAlt,
  FaClock,
  FaBuilding,
  FaExclamationCircle,
  FaBriefcase,
} from "react-icons/fa";

interface Vacancy {
  _id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  department: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange?: string;
  expiryDate?: string;
  isActive: boolean;
  isUrgent: boolean;
  createdBy: string;
  createdAt: string;
}

const types = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const defaultForm = {
  title: "",
  description: "",
  location: "",
  type: "full-time",
  department: "",
  requirements: [""],
  responsibilities: [""],
  salaryRange: "",
  expiryDate: "",
  isActive: true,
  isUrgent: false,
};

export default function AdminVacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchVacancies = useCallback(async () => {
    try {
      const res = await fetch("/api/vacancies?limit=50");
      if (res.ok) {
        const data = await res.json();
        setVacancies(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch vacancies:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(defaultForm);
    setError("");
    setShowModal(true);
  };

  const openEditModal = (vacancy: Vacancy) => {
    setEditingId(vacancy._id);
    setForm({
      title: vacancy.title,
      description: vacancy.description,
      location: vacancy.location,
      type: vacancy.type,
      department: vacancy.department,
      requirements: vacancy.requirements.length > 0 ? vacancy.requirements : [""],
      responsibilities: vacancy.responsibilities.length > 0 ? vacancy.responsibilities : [""],
      salaryRange: vacancy.salaryRange || "",
      expiryDate: vacancy.expiryDate ? new Date(vacancy.expiryDate).toISOString().split("T")[0] : "",
      isActive: vacancy.isActive,
      isUrgent: vacancy.isUrgent,
    });
    setError("");
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const cleanedForm = {
      ...form,
      requirements: form.requirements.filter((r) => r.trim()),
      responsibilities: form.responsibilities.filter((r) => r.trim()),
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { ...cleanedForm, id: editingId } : cleanedForm;

      const res = await fetch("/api/vacancies", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setShowModal(false);
        fetchVacancies();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save vacancy");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vacancy?")) return;

    try {
      const res = await fetch("/api/vacancies", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        fetchVacancies();
      }
    } catch (err) {
      console.error("Failed to delete vacancy:", err);
    }
  };

  const addListItem = (field: "requirements" | "responsibilities") => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeListItem = (field: "requirements" | "responsibilities", index: number) => {
    setForm({
      ...form,
      [field]: form[field].filter((_, i) => i !== index),
    });
  };

  const updateListItem = (field: "requirements" | "responsibilities", index: number, value: string) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bebas text-primary tracking-wide">
            Vacancies
          </h1>
          <p className="text-gray-500 text-sm">
            Manage job openings and career opportunities
          </p>
        </div>
        <button onClick={openCreateModal} className="btn-primary text-sm flex items-center gap-2">
          <FaPlus className="w-3 h-3" /> Add Vacancy
        </button>
      </div>

      {/* Vacancies List */}
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
      ) : vacancies.length > 0 ? (
        <div className="space-y-3">
          {vacancies.map((vacancy) => (
            <div
              key={vacancy._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {vacancy.title}
                      </h3>
                      {vacancy.isUrgent && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-medium flex items-center gap-1">
                          <FaExclamationCircle className="w-2.5 h-2.5" /> Urgent
                        </span>
                      )}
                      {!vacancy.isActive && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                      {vacancy.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="w-3 h-3" /> {vacancy.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="w-3 h-3" /> {types.find((t) => t.value === vacancy.type)?.label}
                      </span>
                      {vacancy.department && (
                        <span className="flex items-center gap-1">
                          <FaBuilding className="w-3 h-3" /> {vacancy.department}
                        </span>
                      )}
                      {vacancy.salaryRange && (
                        <span className="text-accent font-medium">{vacancy.salaryRange}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex border-t border-gray-100">
                <button
                  onClick={() => openEditModal(vacancy)}
                  className="flex-1 py-2.5 text-xs text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <FaEdit className="w-3 h-3" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(vacancy._id)}
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
          <FaBriefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bebas text-primary tracking-wide mb-1">
            No Vacancies Yet
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Create job openings to display on the Careers page.
          </p>
          <button onClick={openCreateModal} className="btn-primary text-sm">
            Create First Vacancy
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bebas text-primary tracking-wide">
                {editingId ? "Edit Vacancy" : "Add Vacancy"}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title *
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
                    Department
                  </label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) =>
                      setForm({ ...form, department: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employment Type *
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {types.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={form.salaryRange}
                    onChange={(e) =>
                      setForm({ ...form, salaryRange: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="e.g. ₦100,000 - ₦200,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) =>
                      setForm({ ...form, expiryDate: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              {/* Requirements */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Requirements
                  </label>
                  <button
                    type="button"
                    onClick={() => addListItem("requirements")}
                    className="text-xs text-accent hover:underline"
                  >
                    + Add
                  </button>
                </div>
                {form.requirements.map((req, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) =>
                        updateListItem("requirements", i, e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Requirement..."
                    />
                    {form.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeListItem("requirements", i)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Responsibilities */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Responsibilities
                  </label>
                  <button
                    type="button"
                    onClick={() => addListItem("responsibilities")}
                    className="text-xs text-accent hover:underline"
                  >
                    + Add
                  </button>
                </div>
                {form.responsibilities.map((resp, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) =>
                        updateListItem("responsibilities", i, e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Responsibility..."
                    />
                    {form.responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeListItem("responsibilities", i)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-6">
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
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isUrgent}
                    onChange={(e) =>
                      setForm({ ...form, isUrgent: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">Urgent</span>
                </label>
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
