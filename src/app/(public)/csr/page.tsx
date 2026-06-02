"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHandsHelping, FaGraduationCap, FaHeartbeat, FaTree, FaArrowRight, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useScrollAnimation } from "@/lib/hooks";

interface Event {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  location: string;
  category: string;
}

const csrPillars = [
  {
    icon: FaGraduationCap,
    title: "Education & Youth Development",
    description:
      "We invest in educational programs, scholarships, and skills development initiatives that empower young Nigerians to build brighter futures for themselves and their communities.",
    initiatives: ["Scholarship programs for underprivileged students", "Vocational training partnerships", "School infrastructure development", "Mentorship and career guidance programs"],
  },
  {
    icon: FaHeartbeat,
    title: "Health & Wellness",
    description:
      "Through health outreach programs and partnerships with healthcare organizations, we work to improve access to quality healthcare in underserved communities across Nigeria.",
    initiatives: ["Free medical outreach programs", "Health awareness campaigns", "Partnership with local health centers", "Employee wellness programs"],
  },
  {
    icon: FaTree,
    title: "Environmental Sustainability",
    description:
      "We are committed to minimizing our environmental footprint through sustainable business practices, waste reduction programs, and eco-friendly distribution solutions.",
    initiatives: ["Waste reduction and recycling programs", "Energy-efficient logistics operations", "Environmental awareness campaigns", "Green packaging initiatives"],
  },
  {
    icon: FaHandsHelping,
    title: "Community Empowerment",
    description:
      "We believe in giving back to the communities where we operate, supporting local businesses, creating employment opportunities, and contributing to community development projects.",
    initiatives: ["Local employment creation", "Community development projects", "Support for small businesses", "Disaster relief contributions"],
  },
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

export default function CSRPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events?category=csr&limit=6");
        if (res.ok) {
          const data = await res.json();
          setEvents(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/assets/images/csr.jpg"
          alt="Corporate Social Responsibility"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              CSR
            </span>
            <h1 className="text-5xl md:text-6xl font-bebas text-white mt-3 mb-4 tracking-wide">
              Corporate Social Responsibility
            </h1>
            <p className="text-gray-200 max-w-2xl text-lg">
              Making a positive impact in the communities we serve through
              sustainable initiatives and meaningful partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* CSR Commitment */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/images/csr.jpg"
                  alt="Community Impact"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <span className="text-accent font-medium text-sm tracking-widest uppercase">
                Our Commitment
              </span>
              <h2 className="text-4xl font-bebas text-primary mt-3 mb-6 tracking-wide">
                Giving Back, Moving Forward
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                At Adenola & Sons, we believe that business success and
                social responsibility go hand in hand. Our CSR initiatives are
                not just corporate obligations — they are integral to who we are
                and how we operate.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We are committed to creating shared value for our stakeholders
                and the communities where we operate. Through strategic
                investments in education, health, environment, and community
                development, we aim to make a lasting positive impact on
                society.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our approach to CSR is guided by the principle that sustainable
                business growth must be accompanied by meaningful contributions
                to social development and environmental stewardship.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CSR Pillars */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Focus Areas
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              Our CSR Pillars
            </h2>
            <div className="section-divider mx-auto mb-6" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {csrPillars.map((pillar) => (
              <AnimatedSection key={pillar.title}>
                <div className="bg-white p-8 rounded-2xl shadow-sm card-hover h-full">
                  <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                    <pillar.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bebas text-primary mb-3 tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                  <ul className="space-y-2">
                    {pillar.initiatives.map((initiative) => (
                      <li key={initiative} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                        {initiative}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CSR Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Recent Activities
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              CSR Events & Initiatives
            </h2>
            <div className="section-divider mx-auto mb-6" />
          </AnimatedSection>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-cream rounded-2xl overflow-hidden">
                  <div className="h-48 skeleton" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 skeleton w-3/4" />
                    <div className="h-4 skeleton w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <AnimatedSection key={event._id}>
                  <div className="bg-cream rounded-2xl overflow-hidden card-hover group">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.imageUrl || "/assets/images/csr.jpg"}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                          <FaCalendarAlt className="w-3 h-3" />
                          {new Date(event.date).toLocaleDateString("en-NG", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                            <FaMapMarkerAlt className="w-3 h-3" />
                            {event.location}
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-bebas text-primary tracking-wide mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaHandsHelping className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">CSR events and initiatives will be posted here soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">
            Partner With Us in Making a Difference
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            We welcome partnerships with organizations and individuals who share
            our commitment to social responsibility and community development.
          </p>
          <Link
            href="/contact"
            className="bg-accent text-white px-8 py-3.5 rounded-lg font-medium hover:bg-accent-dark transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2"
          >
            Get Involved <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </>
  );
}
