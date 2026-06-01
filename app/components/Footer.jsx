"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { Poppins } from "next/font/google";

import Logo from "../assets/images/Logo.png";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

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
    <footer className={`bg-gray-900 text-white ${poppins.className}`}>
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white/5 p-1">
                <Image
                  src={Logo}
                  alt="Vicmart Enterprises"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div>
                <div className="text-lg font-bold tracking-wide">VICMART</div>
                <div className="text-xs uppercase tracking-widest text-white/60">
                  Enterprises Limited
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-white/70">
              An indigenous firm involved in the marketing and sales of FMCG
              (fast moving consumer goods) and other allied products to meet
              the needs of our customers.
            </p>

            {/* Socials */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
              >
                <FaXTwitter className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
              >
                <FaInstagram className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-4">
            <div className="text-sm font-semibold text-white/90">
              Useful Links
            </div>

            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
                  >
                    <GoDotFill className="h-2.5 w-2.5 text-[#c8a45e] group-hover:translate-x-0.5 transition" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <div className="text-sm font-semibold text-white/90">
              Contact Us
            </div>

            <div className="space-y-4 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MdLocationOn className="h-5 w-5 mt-0.5 text-[#c8a45e]" />
                <div>
                  <div>Block C, Plot 2, Oluyole Extension,</div>
                  <div>Oluyole, Ibadan.</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MdPhone className="h-4 w-4 text-[#c8a45e]" />
                <a
                  href="tel:+2348055096909"
                  className="hover:text-white transition"
                >
                  +234-80-5509-6909
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MdEmail className="h-4 w-4 text-[#c8a45e]" />
                <a
                  href="mailto:enquiries@vicmartent.com"
                  className="hover:text-white transition"
                >
                  enquiries@vicmartent.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="text-center text-xs text-white/60 md:text-left">
            © {currentYear}{" "}
            <span className="text-white/90">Vicmart Enterprises Limited</span>.
            All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;