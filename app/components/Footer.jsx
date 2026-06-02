"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn, MdArrowRight } from "react-icons/md";

import Logo from "../assets/images/Logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const usefulLinks = [
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-gradient-to-b from-dark to-dark/95 text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to partner with us?
              </h3>
              <p className="text-white/70 text-lg">
                Connect with our team to explore how we can support your business growth.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center justify-center gap-2 group"
              >
                Get in Touch
                <MdArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-primary-600 p-1">
                <Image
                  src={Logo}
                  alt="Vicmart Enterprises"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <div className="text-lg font-bold text-white">VICMART</div>
                <div className="text-xs text-white/60 font-semibold">ENTERPRISES</div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-white/70">
              An indigenous firm marketing and selling FMCG and allied products to meet the needs of our customers.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 hover:bg-primary-600 hover:border-primary-600 transition-all duration-300"
              >
                <FaXTwitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 hover:bg-primary-600 hover:border-primary-600 transition-all duration-300"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 hover:bg-primary-600 hover:border-primary-600 transition-all duration-300"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 hover:bg-primary-600 hover:border-primary-600 transition-all duration-300"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 group-hover:translate-x-1 transition-transform"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 group-hover:translate-x-1 transition-transform"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 group-hover:translate-x-1 transition-transform"></span>
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 group-hover:translate-x-1 transition-transform"></span>
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <MdLocationOn className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div className="text-white/70">
                  <div>Block C, Plot 2,</div>
                  <div>Oluyole Extension,</div>
                  <div>Ibadan, Nigeria</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MdPhone className="h-5 w-5 text-primary-500 flex-shrink-0" />
                <a
                  href="tel:+2348055096909"
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  +234-80-5509-6909
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MdEmail className="h-5 w-5 text-primary-500 flex-shrink-0" />
                <a
                  href="mailto:enquiries@vicmartent.com"
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  enquiries@vicmartent.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              © {currentYear} <span className="text-white/90 font-semibold">Vicmart Enterprises Limited</span>. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors">
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