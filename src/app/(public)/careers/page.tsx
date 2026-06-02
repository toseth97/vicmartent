"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaFilter,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";
import { useScrollAnimation } from "@/lib/hooks";

interface Vacancy {
  _id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  department: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange?: string;
  expiryDate?: string;
  isActive: boolean;
  isUrgent: boolean;
  createdAt: string;
}

const typeLabels: Record<string, string> = {
  "full-time": "Full Time",
  "part-time": "Part Time",
  contract: "Contract",
  internship: "Internship",
};

const benefits = [
  { title: "Competitive Salary", description: "Industry-leading compensation packages with performance bonuses" },
  { title: "Health Insurance", description: "Comprehensive medical coverage for employees and dependents" },
  { title: "Career Growth", description: "Clear career progression paths with training and development programs" },
  { title: "Work-Life Balance", description: "Flexible working arrangements and generous leave policies" },
  { title: "Team Culture", description: "Collaborative, inclusive work environment that celebrates diversity" },
  { title: "Learning Opportunities", description: "Access to professional development courses and certifications" },
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

export default function CareersPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDepartment, setActiveDepartment] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVacancies() {
      try {
        const res = await fetch("/api/vacancies?active=true");
        if (res.ok) {
          const data = await res.json();
          setVacancies(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch vacancies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVacancies();
  }, []);

  const departments = ["all", ...new Set(vacancies.map((v) => v.department).filter(Boolean))];
  const filteredVacancies = vacancies.filter(
    (v) => activeDepartment === "all" || v.department === activeDepartment
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/assets/images/milestone.png"
          alt="Careers at Vicmart"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Careers
            </span>
            <h1 className="text-5xl md:text-6xl font-bebas text-white mt-3 mb-4 tracking-wide">
              Join Our Team
            </h1>
            <p className="text-gray-200 max-w-2xl text-lg">
              Build your career with one of Nigeria&apos;s leading FMCG
              distribution companies. We are always looking for talented and
              passionate individuals.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Why Vicmart
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              Why Work With Us
            </h2>
            <div className="section-divider mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Vicmart Enterprises, we believe our people are our greatest
              asset. We create an environment where talent thrives, ideas
              flourish, and careers grow.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <AnimatedSection key={benefit.title}>
                <div className="bg-cream p-6 rounded-2xl card-hover h-full">
                  <h3 className="text-xl font-bebas text-primary tracking-wide mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Open Positions
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              Current Vacancies
            </h2>
            <div className="section-divider mx-auto mb-6" />
          </AnimatedSection>

          {/* Department Filter */}
          {vacancies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDepartment(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeDepartment === dept
                      ? "bg-primary text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {dept === "all" ? (
                    "All Departments"
                  ) : (
                    <>
                      <FaBuilding className="w-3 h-3" />
                      {dept}
                    </>
                  )}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6">
                  <div className="h-6 skeleton w-1/3 mb-3" />
                  <div className="h-4 skeleton w-1/4 mb-2" />
                  <div className="h-4 skeleton w-full" />
                </div>
              ))}
            </div>
          ) : filteredVacancies.length > 0 ? (
            <div className="space-y-4">
              {filteredVacancies.map((vacancy) => (
                <AnimatedSection key={vacancy._id}>
                  <div className="bg-white rounded-2xl overflow-hidden card-hover">
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() =>
                        setExpandedId(expandedId === vacancy._id ? null : vacancy._id)
                      }
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bebas text-primary tracking-wide">
                              {vacancy.title}
                            </h3>
                            {vacancy.isUrgent && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                                Urgent
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                              <FaMapMarkerAlt className="w-3 h-3" />
                              {vacancy.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <FaClock className="w-3 h-3" />
                              {typeLabels[vacancy.type] || vacancy.type}
                            </span>
                            {vacancy.department && (
                              <span className="flex items-center gap-1.5">
                                <FaBuilding className="w-3 h-3" />
                                {vacancy.department}
                              </span>
                            )}
                            {vacancy.salaryRange && (
                              <span className="text-accent font-medium">
                                {vacancy.salaryRange}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {vacancy.expiryDate && (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <FaCalendarAlt className="w-3 h-3" />
                              Closes: {new Date(vacancy.expiryDate).toLocaleDateString()}
                            </span>
                          )}
                          <FaArrowRight
                            className={`w-4 h-4 text-primary transition-transform duration-300 ${
                              expandedId === vacancy._id ? "rotate-90" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {expandedId === vacancy._id && (
                      <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                          {vacancy.description}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          {vacancy.requirements && vacancy.requirements.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-primary mb-3">
                                Requirements
                              </h4>
                              <ul className="space-y-2">
                                {vacancy.requirements.map((req, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {vacancy.responsibilities && vacancy.responsibilities.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-primary mb-3">
                                Responsibilities
                              </h4>
                              <ul className="space-y-2">
                                {vacancy.responsibilities.map((resp, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                                    {resp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <Link
                          href={`/careers?id=${vacancy._id}`}
                          className="btn-primary inline-flex items-center gap-2 text-sm"
                        >
                          Apply Now <FaArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FaBriefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bebas text-primary tracking-wide mb-2">
                No Open Positions Right Now
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                We are always looking for talented individuals. Send us your
                CV and we will reach out when a suitable position opens up.
              </p>
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                Submit Your CV <FaArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/assets/images/milestone.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">
            Don&apos;t See a Suitable Position?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            We are always interested in hearing from motivated professionals.
            Send us your CV and we will keep you in mind for future openings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-accent text-white px-8 py-3.5 rounded-lg font-medium hover:bg-accent-dark transition-all duration-300 hover:shadow-lg flex items-center gap-2"
            >
              Send Your CV <FaArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
