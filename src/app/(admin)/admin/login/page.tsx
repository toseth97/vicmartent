"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaShieldAlt, FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/assets/images/container.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-8">
            <FaShieldAlt className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bebas text-white tracking-wider mb-4">
            Vicmart Admin
          </h1>
          <p className="text-gray-300 text-lg max-w-sm mx-auto">
            Secure administration portal for managing Vicmart Enterprises
            website content and operations.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-white/40 text-sm">
            <span>Encrypted</span>
            <span>•</span>
            <span>Secure</span>
            <span>•</span>
            <span>Protected</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-60 h-60 bg-accent/5 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/5 rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaShieldAlt className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl font-bebas text-primary tracking-wider">
              Vicmart Admin
            </h1>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bebas text-primary tracking-wide">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Sign in to your admin account
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="admin@vic.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-12"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-4 h-4" />
                    ) : (
                      <FaEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-light transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-gray-400 text-xs mt-6">
            This is a secure admin portal. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
