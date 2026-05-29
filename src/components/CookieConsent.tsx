"use client";

import React, { useState, useEffect } from "react";
import { FaCookieBite, FaTimes, FaCheck } from "react-icons/fa";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("vicmart-cookie-consent");
    if (!consent) {
      // Show the banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("vicmart-cookie-consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("vicmart-cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-[slideUp_0.5s_ease-out]">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FaCookieBite className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-1">
                We Value Your Privacy
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                We use cookies to enhance your browsing experience, serve
                personalized content, and analyze our traffic. By clicking
                &quot;Accept All&quot;, you consent to our use of cookies.{" "}
                <a
                  href="/privacy"
                  className="text-primary hover:underline font-medium"
                >
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={declineCookies}
              className="flex-1 sm:flex-initial px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              <FaCheck className="w-3 h-3" />
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
