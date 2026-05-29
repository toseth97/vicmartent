"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaCogs,
  FaFlask,
  FaCertificate,
  FaIndustry,
  FaRecycle,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { useScrollAnimation } from "@/lib/hooks";

const capabilities = [
  {
    icon: FaCogs,
    title: "Production Lines",
    description:
      "Modern production lines equipped with automated systems for high-volume manufacturing of consumer goods, ensuring consistent quality and output.",
  },
  {
    icon: FaFlask,
    title: "Quality Control",
    description:
      "In-house laboratory with advanced testing equipment for raw material verification, in-process quality checks, and finished product certification.",
  },
  {
    icon: FaCertificate,
    title: "Certifications",
    description:
      "Our manufacturing facilities meet international standards including ISO, NAFDAC, and SON certifications, ensuring products meet the highest quality benchmarks.",
  },
  {
    icon: FaIndustry,
    title: "Capacity",
    description:
      "Large-scale manufacturing capacity capable of meeting growing market demands while maintaining quality standards and delivery timelines.",
  },
  {
    icon: FaRecycle,
    title: "Sustainability",
    description:
      "Commitment to sustainable manufacturing practices including waste reduction, energy efficiency, and environmentally responsible production processes.",
  },
];

const processes = [
  { step: "01", title: "Raw Material Sourcing", description: "We source the highest quality raw materials from certified suppliers, ensuring consistency and safety from the very beginning." },
  { step: "02", title: "Production & Processing", description: "State-of-the-art production lines with automated quality monitoring at every stage, from mixing to packaging." },
  { step: "03", title: "Quality Testing", description: "Rigorous laboratory testing at multiple checkpoints ensures every batch meets our exacting standards before proceeding." },
  { step: "04", title: "Packaging & Labeling", description: "Modern packaging lines with precise labeling and coding for traceability, shelf-life management, and brand integrity." },
  { step: "05", title: "Storage & Distribution", description: "Climate-controlled warehousing and efficient logistics ensure products reach the market in optimal condition." },
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

export default function ManufacturingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/assets/images/manufacture.webp"
          alt="Manufacturing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Manufacturing
            </span>
            <h1 className="text-5xl md:text-6xl font-bebas text-white mt-3 mb-4 tracking-wide">
              Manufacturing Excellence
            </h1>
            <p className="text-gray-200 max-w-2xl text-lg">
              State-of-the-art manufacturing facilities producing quality
              consumer goods that meet international standards.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-accent font-medium text-sm tracking-widest uppercase">
                Our Facilities
              </span>
              <h2 className="text-4xl font-bebas text-primary mt-3 mb-6 tracking-wide">
                Built for Quality and Scale
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Vicmart Enterprises operates modern manufacturing facilities
                that produce a range of consumer goods meeting the highest
                international quality standards. Our manufacturing division
                complements our distribution business, allowing us to offer
                locally produced alternatives alongside our international brand
                partnerships.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Every product that leaves our production lines undergoes
                rigorous quality testing to ensure it meets both NAFDAC and
                international safety standards. Our commitment to quality
                manufacturing has earned us certifications and recognition
                across the industry.
              </p>
              <div className="space-y-3">
                {["NAFDAC certified facilities", "ISO quality management standards", "Automated production lines", "In-house quality control laboratory"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <FaCheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/images/manufacturing.jpg"
                  alt="Manufacturing Facility"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Capabilities
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              What Sets Us Apart
            </h2>
            <div className="section-divider mx-auto mb-6" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability) => (
              <AnimatedSection key={capability.title}>
                <div className="bg-white p-8 rounded-2xl shadow-sm card-hover h-full">
                  <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                    <capability.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bebas text-primary mb-3 tracking-wide">
                    {capability.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Our Process
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              From Raw Materials to Finished Products
            </h2>
            <div className="section-divider mx-auto mb-6" />
          </AnimatedSection>

          <div className="space-y-8">
            {processes.map((process) => (
              <AnimatedSection key={process.step}>
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                    <span className="text-accent font-bebas text-2xl">{process.step}</span>
                  </div>
                  <div className="flex-1 pb-8 border-b border-gray-100">
                    <h3 className="text-xl font-bebas text-primary tracking-wide mb-2">
                      {process.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {process.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">
            Looking for Manufacturing Partners?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            We are open to manufacturing partnerships and contract production
            arrangements. Get in touch to explore opportunities.
          </p>
          <Link
            href="/contact"
            className="bg-white text-accent px-8 py-3.5 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2"
          >
            Contact Us <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      </section>
    </>
  );
}
