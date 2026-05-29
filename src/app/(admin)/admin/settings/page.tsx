"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FaCog,
  FaSave,
  FaGlobe,
  FaShareAlt,
  FaImage,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSpinner,
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface SiteSettings {
  _id?: string;
  siteName: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  twitterUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  maintenanceMode: boolean;
}

const defaultSettings: SiteSettings = {
  siteName: "Vicmart Enterprises Limited",
  tagline: "Distributing Superior Products & Services",
  description:
    "An indigenous firm involved in the marketing and sales of FMCG and other allied products.",
  address: "Block C, Plot 2, Oluyole Extension, Oluyole, Ibadan.",
  phone: "+234-80-5509-6909",
  email: "enquiries@vicmartent.com",
  twitterUrl: "#",
  facebookUrl: "#",
  instagramUrl: "#",
  linkedinUrl: "#",
  youtubeUrl: "#",
  heroTitle:
    "We Distribute Superior Products and Services that Improves the Life of Consumers",
  heroSubtitle:
    "Leading FMCG distribution company in Nigeria with a commitment to quality and excellence",
  maintenanceMode: false,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        const fetched = data.data || data;
        if (fetched && Object.keys(fetched).length > 0) {
          setSettings({ ...defaultSettings, ...fetched });
        }
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        const data = await res.json();
        setSettings({ ...defaultSettings, ...(data.data || data) });
        setSuccess("Settings saved successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save settings");
      }
    } catch (err) {
      setError("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: FaGlobe },
    { id: "contact", label: "Contact Info", icon: FaBuilding },
    { id: "social", label: "Social Media", icon: FaShareAlt },
    { id: "hero", label: "Hero Section", icon: FaImage },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
        <div className="bg-white rounded-xl border p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-full bg-gray-100 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">Settings</h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage your website configuration
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <FaSpinner className="w-4 h-4 animate-spin" />
          ) : (
            <FaSave className="w-4 h-4" />
          )}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          <FaCheckCircle className="w-4 h-4 flex-shrink-0" />
          {success}
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* General Tab */}
        {activeTab === "general" && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              General Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Site Name
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Tagline
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={settings.tagline}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Site Description
              </label>
              <textarea
                name="description"
                value={settings.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    Maintenance Mode
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    When enabled, visitors will see a maintenance page instead
                    of the website
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500" />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info Tab */}
        {activeTab === "contact" && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                  <FaPhone className="w-3.5 h-3.5 text-gray-400" />
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                  <FaEnvelope className="w-3.5 h-3.5 text-gray-400" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-gray-400" />
                Address
              </label>
              <textarea
                name="address"
                value={settings.address}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
          </div>
        )}

        {/* Social Media Tab */}
        {activeTab === "social" && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Social Media Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Twitter / X URL
                </label>
                <input
                  type="url"
                  name="twitterUrl"
                  value={settings.twitterUrl}
                  onChange={handleChange}
                  placeholder="https://twitter.com/..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Facebook URL
                </label>
                <input
                  type="url"
                  name="facebookUrl"
                  value={settings.facebookUrl}
                  onChange={handleChange}
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Instagram URL
                </label>
                <input
                  type="url"
                  name="instagramUrl"
                  value={settings.instagramUrl}
                  onChange={handleChange}
                  placeholder="https://instagram.com/..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={settings.linkedinUrl}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  YouTube URL
                </label>
                <input
                  type="url"
                  name="youtubeUrl"
                  value={settings.youtubeUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </div>
        )}

        {/* Hero Section Tab */}
        {activeTab === "hero" && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Hero Section
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Hero Title
              </label>
              <textarea
                name="heroTitle"
                value={settings.heroTitle}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Hero Subtitle
              </label>
              <textarea
                name="heroSubtitle"
                value={settings.heroSubtitle}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
            {/* Preview */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-500 mb-3">
                Preview
              </label>
              <div className="bg-primary rounded-xl p-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bebas text-white tracking-wider mb-3">
                  {settings.heroTitle}
                </h2>
                <p className="text-white/80 text-sm max-w-lg mx-auto">
                  {settings.heroSubtitle}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Button (bottom) */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <FaSpinner className="w-4 h-4 animate-spin" />
          ) : (
            <FaSave className="w-4 h-4" />
          )}
          {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
