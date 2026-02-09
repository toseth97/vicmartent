"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setShowConsent(true);
        }
    }, []);

    const acceptAll = () => {
        localStorage.setItem("cookieConsent", "all");
        setShowConsent(false);
        // Enable all cookies
    };

    const acceptNecessary = () => {
        localStorage.setItem("cookieConsent", "necessary");
        setShowConsent(false);
        // Disable non-essential cookies
    };

    if (!showConsent) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 md:mr-4">
                    <p className="text-sm">
                        We use cookies to enhance your experience. By continuing
                        to visit this site you agree to our use of cookies.
                    </p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={acceptNecessary}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
                    >
                        Accept Necessary Cookies
                    </button>
                    <button
                        onClick={acceptAll}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                    >
                        Accept All Cookies
                    </button>
                </div>
            </div>
        </div>
    );
}
