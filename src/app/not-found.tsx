"use client";

import React from "react";
import Link from "next/link";
import { FaHome, FaArrowLeft, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bebas leading-none text-white/10 select-none">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wider">
              Page Not Found
            </h2>
          </div>
        </div>

        {/* Message */}
        <p className="text-white/60 text-lg mb-8 max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Search-like decorative element */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8 max-w-sm mx-auto">
          <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3">
            <FaSearch className="w-4 h-4 text-white/30" />
            <span className="text-white/30 text-sm">
              Try searching for what you need...
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            <FaHome className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20"
          >
            <FaArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Helpful links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm mb-4">
            Helpful Links
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Link
              href="/about"
              className="text-white/60 hover:text-accent transition-colors text-sm"
            >
              About Us
            </Link>
            <Link
              href="/products"
              className="text-white/60 hover:text-accent transition-colors text-sm"
            >
              Products
            </Link>
            <Link
              href="/careers"
              className="text-white/60 hover:text-accent transition-colors text-sm"
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className="text-white/60 hover:text-accent transition-colors text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
