"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaTruck,
  FaWarehouse,
  FaMapMarkerAlt,
  FaClock,
  FaBarcode,
  FaShieldAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { useScrollAnimation } from "@/lib/hooks";

const features = [
  {
    icon: FaWarehouse,
    title: "Modern Warehousing",
    description:
      "State-of-the-art warehouse facilities across Nigeria with climate control systems to ensure product integrity from storage to delivery.",
  },
  {
    icon: FaTruck,
    title: "Fleet Management",
    description:
      "A comprehensive fleet of delivery vehicles equipped with GPS tracking and temperature monitoring for real-time visibility.",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Nationwide Coverage",
    description:
      "Eight strategically located branches covering all major regions in Nigeria, ensuring products reach every market efficiently.",
  },
  {
    icon: FaClock,
    title: "Timely Delivery",
    description:
      "Our logistics network is designed for speed and reliability, ensuring on-time delivery to retailers and distributors nationwide.",
  },
  {
    icon: FaBarcode,
    title: "Inventory Management",
    description:
      "Advanced inventory management systems provide real-time stock visibility, demand forecasting, and automated replenishment.",
  },
  {
    icon: FaShieldAlt,
    title: "Quality Assurance",
    description:
      "Rigorous quality checks at every stage of the supply chain ensure that only authentic, high-quality products reach consumers.",
  },
];

const branches = [
  { city: "Lagos", type: "Head Office", address: "45 Admiralty Way, Lekki Phase 1, Lagos" },
  { city: "Abuja", type: "Branch Office", address: "Plot 23, Aminu Kano Crescent, Wuse 2, Abuja" },
  { city: "Port Harcourt", type: "Branch Office", address: "12 Azikiwe Road, Port Harcourt, Rivers State" },
  { city: "Kano", type: "Branch Office", address: "45 Bompai Road, Kano, Kano State" },
  { city: "Ibadan", type: "Branch Office", address: "78 Ring Road, Ibadan, Oyo State" },
  { city: "Benin", type: "Branch Office", address: "23 Sapele Road, Benin City, Edo State" },
  { city: "Enugu", type: "Branch Office", address: "56 Ogui Road, Enugu, Enugu State" },
  { city: "Kaduna", type: "Branch Office", address: "34 Ahmadu Bello Way, Kaduna, Kaduna State" },
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

export default function DistributionPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/assets/images/distribution.webp"
          alt="Distribution Network"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Distribution
            </span>
            <h1 className="text-5xl md:text-6xl font-bebas text-white mt-3 mb-4 tracking-wide">
              Nationwide Distribution Network
            </h1>
            <p className="text-gray-200 max-w-2xl text-lg">
              Delivering quality FMCG products to every corner of Nigeria
              through our extensive logistics infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/images/container.jpg"
                  alt="Distribution Operations"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <span className="text-accent font-medium text-sm tracking-widest uppercase">
                Our Reach
              </span>
              <h2 className="text-4xl font-bebas text-primary mt-3 mb-6 tracking-wide">
                Connecting Brands to Consumers
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                At the heart of Adenola & Sons is a robust distribution
                network that spans the length and breadth of Nigeria. Our
                logistics infrastructure connects world-class FMCG brands with
                millions of Nigerian consumers through efficient and reliable
                supply chain management.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                With strategically located warehouses, a modern fleet of
                delivery vehicles, and advanced inventory management systems, we
                ensure that products move seamlessly from manufacturers to
                retail shelves across the country.
              </p>
              <div className="space-y-3">
                {["8 Branch offices across Nigeria", "500+ Dedicated team members", "50+ Global brand partnerships", "24/7 Logistics operations"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <FaCheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Our Capabilities
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              Distribution Excellence
            </h2>
            <div className="section-divider mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our distribution capabilities are built on technology, expertise,
              and a relentless commitment to delivering quality products on
              time, every time.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <AnimatedSection key={feature.title}>
                <div className="bg-white p-8 rounded-2xl shadow-sm card-hover h-full">
                  <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bebas text-primary mb-3 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Branch Network */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Our Locations
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              Branch Network
            </h2>
            <div className="section-divider mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our eight strategically located branches ensure comprehensive
              coverage of the Nigerian market, enabling efficient product
              distribution nationwide.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((branch) => (
              <AnimatedSection key={branch.city}>
                <div className="bg-cream p-6 rounded-2xl card-hover h-full">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <FaMapMarkerAlt className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bebas text-primary tracking-wide">
                    {branch.city}
                  </h3>
                  <span className="text-accent text-xs font-medium uppercase tracking-wider">
                    {branch.type}
                  </span>
                  <p className="text-gray-600 text-sm mt-3">{branch.address}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/assets/images/forklift.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">
            Need Distribution Services?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Partner with us for reliable, efficient, and quality-focused
            FMCG distribution across Nigeria.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-accent text-white px-8 py-3.5 rounded-lg font-medium hover:bg-accent-dark transition-all duration-300 hover:shadow-lg flex items-center gap-2"
            >
              Contact Us <FaArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-8 py-3.5 rounded-lg font-medium hover:bg-white hover:text-primary transition-all duration-300"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
