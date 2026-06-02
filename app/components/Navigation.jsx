"use client";
import React, { useState, useEffect } from "react";
import Logo from "../assets/images/Logo.png";
import Link from "next/link";
import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const Navigation = () => {
    const [menuClick, setMenuClick] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // 🔒 Lock scroll when menu is open
    useEffect(() => {
        if (menuClick) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup when component unmounts
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuClick]);

    // Track scroll for header background change
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/distribution", label: "Distribution" },
        { href: "/products", label: "Products" },
        { href: "/careers", label: "Careers" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header
            className={`w-full fixed top-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white shadow-soft border-b border-gray-100"
                    : "bg-white/80 backdrop-blur-md shadow-soft"
            }`}
        >
            <nav className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-20">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 p-1.5">
                        <Image
                            src={Logo}
                            height={40}
                            width={40}
                            alt="Vicmart Enterprises"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="hidden sm:block">
                        <div className="text-sm font-bold text-primary-900">VICMART</div>
                        <div className="text-xs text-gray-600">Enterprises</div>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden lg:flex items-center gap-1">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-700 transition-colors duration-200 relative group"
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-600 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* CTA Button - Desktop */}
                <div className="hidden lg:flex items-center gap-4">
                    <Link href="/contact" className="btn-primary text-sm">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden flex items-center justify-center p-2 text-gray-700 hover:text-primary-700 transition-colors"
                    onClick={() => setMenuClick((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {menuClick ? (
                        <IoClose className="text-2xl" />
                    ) : (
                        <IoMenu className="text-2xl" />
                    )}
                </button>
            </nav>

            {/* Mobile Navigation */}
            {menuClick && (
                <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-sm animate-fade-in-down">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors duration-200"
                                        onClick={() => setMenuClick(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/contact"
                            className="btn-primary text-sm w-full text-center mt-4 block"
                            onClick={() => setMenuClick(false)}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navigation;
