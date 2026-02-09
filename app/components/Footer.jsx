"use client";

import React from "react";
import Image from "next/image";
import Logo from "../assets/images/Logo.png";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import {
    FaLinkedinIn,
    FaFacebookF,
    FaInstagram,
    FaChevronRight,
    FaPhone,
    FaEnvelope,
} from "react-icons/fa";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const Footer = () => {
    const current_year = new Date().getFullYear();

    return (
        <footer className={`bg-gray-800 text-white  ${poppins.className}`}>
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Company Info & Social Links */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div>
                                    <Image
                                        src={Logo}
                                        height={150}
                                        width={150}
                                        alt="Vicmart Enterprise"
                                    />
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                An indigenous firm involved in the marketing and
                                sales of FMCG (fast moving consumer goods) and
                                other allied products to meet the needs of our
                                customers.
                            </p>
                        </div>

                        {/* Social Media Links */}
                        <div className="flex space-x-3">
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-indigo-950 transition-all duration-300 hover:scale-110"
                                aria-label="Twitter"
                            >
                                <FaXTwitter className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-indigo-950 transition-all duration-300 hover:scale-110"
                                aria-label="Facebook"
                            >
                                <FaFacebookF className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-indigo-950 transition-all duration-300 hover:scale-110"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-indigo-950 transition-all duration-300 hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <p className="text-lg font-bold mb-6 text-white">
                            Useful Links
                        </p>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                                >
                                    <FaChevronRight className="w-3 h-3 mr-2 text-gray-400 group-hover:text-white transition-colors" />
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                                >
                                    <FaChevronRight className="w-3 h-3 mr-2 text-gray-400 group-hover:text-white transition-colors" />
                                    Products
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/careers"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                                >
                                    <FaChevronRight className="w-3 h-3 mr-2 text-gray-400 group-hover:text-white transition-colors" />
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/press"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                                >
                                    <FaChevronRight className="w-3 h-3 mr-2 text-gray-400 group-hover:text-white transition-colors" />
                                    Press
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                                >
                                    <FaChevronRight className="w-3 h-3 mr-2 text-gray-400 group-hover:text-white transition-colors" />
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Our Branches */}
                    {/* <div>
                        <p className="text-lg font-bold mb-6 text-white">
                            Our Branches
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                "Lagos",
                                "Ibadan",
                                "Onitsha",
                                "Enugu",
                                "Benin",
                                "Port Harcourt",
                                "Kano",
                                "Abuja",
                            ].map((branch, index) => (
                                <div
                                    key={index}
                                    className="flex items-center text-gray-300"
                                >
                                    <GoDotFill className="w-3 h-3 mr-2 text-indigo-400 flex-shrink-0" />
                                    <span className="text-sm">{branch}</span>
                                </div>
                            ))}
                        </div>
                    </div> */}

                    {/* Contact Information */}
                    <div>
                        <p className="text-lg font-bold mb-6 text-white">
                            Contact Us
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <FaLocationDot className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div className="text-gray-300 text-sm">
                                    <p>Block C, Plot 2, Oluyole Extension,</p>
                                    <p>Oluyole, Ibadan.</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <FaPhone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <a
                                    href="tel:+2348055096909"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    +234-80-5509-6909
                                </a>
                            </div>

                            <div className="flex items-center space-x-3">
                                <FaEnvelope className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <a
                                    href="mailto:enquiries@vicmartent.com"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    enquiries@vicmartent.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-300 text-sm w-full text-center">
                            © {current_year}{" "}
                            <span className="font-semibold text-white">
                                Vicmart Enterprises Limited
                            </span>
                            . All Rights Reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
