"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronRight,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="/assets/images/Logo.png"
                  alt="Adenola & Sons"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-wider font-bebas">
                  ADENOLA & SONS
                </h3>
                <span className="text-[10px] text-gray-400 tracking-widest uppercase">
                  Enterprises Limited
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              An indigenous firm involved in the marketing and sales of FMCG
              (fast moving consumer goods) and other allied products to meet the
              needs of our customers.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, href: "#", label: "Facebook" },
                { icon: FaTwitter, href: "#", label: "Twitter" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold tracking-wider font-bebas mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/products", label: "Our Products" },
                { href: "/distribution", label: "Distribution" },
                { href: "/manufacturing", label: "Manufacturing" },
                { href: "/csr", label: "CSR" },
                { href: "/press", label: "Press" },
                { href: "/careers", label: "Careers" },
                { href: "/contact", label: "Contact Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-300 hover:text-accent transition-colors duration-200 flex items-center gap-2 text-sm group"
                  >
                    <FaChevronRight className="w-2 h-2 text-accent group-hover:translate-x-1 transition-transform" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Branches */}
          <div>
            <h4 className="text-lg font-bold tracking-wider font-bebas mb-6">
              Our Branches
            </h4>
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
              ].map((branch) => (
                <div
                  key={branch}
                  className="flex items-center text-gray-300 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 flex-shrink-0" />
                  {branch}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold tracking-wider font-bebas mb-6">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>Block C, Plot 2, Oluyole Extension,</p>
                  <p>Oluyole, Ibadan.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href="tel:+2348055096909"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  +234-80-5509-6909
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href="mailto:enquiries@adenolaandsons.com"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  enquiries@adenolaandsons.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear}{" "}
              <span className="text-white font-medium">
                Adenola & Sons
              </span>
              . All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/contact" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/contact" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
