"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaWhatsapp,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useScrollAnimation } from "@/lib/hooks";

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: "Head Office",
    lines: ["45 Admiralty Way, Lekki Phase 1", "Lagos, Nigeria"],
  },
  {
    icon: FaPhone,
    title: "Phone",
    lines: ["+234 (0) 812 345 6789", "+234 (0) 901 234 5678"],
  },
  {
    icon: FaEnvelope,
    title: "Email",
    lines: ["info@vicmart.com", "support@vicmart.com"],
  },
  {
    icon: FaClock,
    title: "Business Hours",
    lines: ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday: 9:00 AM - 1:00 PM"],
  },
];

const branches = [
  { city: "Lagos", address: "45 Admiralty Way, Lekki Phase 1, Lagos" },
  { city: "Abuja", address: "Plot 23, Aminu Kano Crescent, Wuse 2, Abuja" },
  { city: "Port Harcourt", address: "12 Azikiwe Road, Port Harcourt, Rivers" },
  { city: "Kano", address: "45 Bompai Road, Kano, Kano State" },
  { city: "Ibadan", address: "78 Ring Road, Ibadan, Oyo State" },
  { city: "Benin", address: "23 Sapele Road, Benin City, Edo State" },
  { city: "Enugu", address: "56 Ogui Road, Enugu, Enugu State" },
  { city: "Kaduna", address: "34 Ahmadu Bello Way, Kaduna" },
];

const inquiryCategories = [
  { value: "general", label: "General Inquiry" },
  { value: "partnership", label: "Business Partnership" },
  { value: "careers", label: "Careers" },
  { value: "products", label: "Products" },
  { value: "complaint", label: "Complaint" },
];

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "general",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          category: "general",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/assets/images/contact.png"
          alt="Contact Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-bebas text-white mt-3 mb-4 tracking-wide">
              Contact Us
            </h1>
            <p className="text-gray-200 max-w-2xl text-lg">
              We would love to hear from you. Whether you have a question about
              our products, services, or anything else, our team is ready to
              assist.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <AnimatedSection key={info.title}>
                <div className="bg-cream p-6 rounded-2xl text-center card-hover h-full">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bebas text-primary tracking-wide mb-3">
                    {info.title}
                  </h3>
                  {info.lines.map((line) => (
                    <p key={line} className="text-gray-600 text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <AnimatedSection>
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm">
                <h2 className="text-3xl font-bebas text-primary tracking-wide mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 text-sm mb-8">
                  Fill out the form below and we will get back to you as soon
                  as possible.
                </p>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm font-medium">
                      Thank you for your message! We will get back to you
                      shortly.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm font-medium">
                      Something went wrong. Please try again later.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="+234 812 345 6789"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        {inquiryCategories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
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
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Branches & Social */}
            <AnimatedSection>
              <div className="space-y-8">
                {/* Branch Offices */}
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <h2 className="text-3xl font-bebas text-primary tracking-wide mb-6">
                    Our Branch Offices
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {branches.map((branch) => (
                      <div key={branch.city} className="flex items-start gap-3">
                        <FaMapMarkerAlt className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-primary">
                            {branch.city}
                          </p>
                          <p className="text-xs text-gray-500">
                            {branch.address}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-primary p-8 rounded-2xl">
                  <h3 className="text-2xl font-bebas text-white tracking-wide mb-4">
                    Connect With Us
                  </h3>
                  <p className="text-gray-300 text-sm mb-6">
                    Follow us on social media for the latest updates, news, and
                    behind-the-scenes content.
                  </p>
                  <div className="flex gap-3">
                    {[
                      { icon: FaWhatsapp, label: "WhatsApp", href: "#" },
                      { icon: FaLinkedin, label: "LinkedIn", href: "#" },
                      { icon: FaTwitter, label: "Twitter", href: "#" },
                      { icon: FaInstagram, label: "Instagram", href: "#" },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-accent transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="bg-accent p-8 rounded-2xl">
                  <h3 className="text-2xl font-bebas text-white tracking-wide mb-3">
                    Need Immediate Assistance?
                  </h3>
                  <p className="text-white/80 text-sm mb-4">
                    For urgent inquiries, please call our customer service line
                    directly.
                  </p>
                  <a
                    href="tel:+2348123456789"
                    className="bg-white text-accent px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <FaPhone className="w-4 h-4" />
                    +234 812 345 6789
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
