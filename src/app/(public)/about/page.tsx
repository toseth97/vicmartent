"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaEye,
  FaBullseye,
  FaHeart,
  FaLinkedin,
  FaTwitter,
  FaArrowRight,
  FaUsers,
  FaGlobeAfrica,
  FaHandshake,
  FaAward,
} from "react-icons/fa";
import { useScrollAnimation } from "@/lib/hooks";

interface Director {
  _id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  linkedinUrl?: string;
  twitterUrl?: string;
}

const values = [
  {
    icon: FaBullseye,
    title: "Our Mission",
    description:
      "To provide quality FMCG products and responsive sales services that improve the life of consumers while creating sustainable value for all stakeholders.",
  },
  {
    icon: FaEye,
    title: "Our Vision",
    description:
      "To be the leading FMCG distribution company in Nigeria, recognized for excellence in product delivery, customer service, and innovative market solutions.",
  },
  {
    icon: FaHeart,
    title: "Our Values",
    description:
      "Integrity, excellence, innovation, and customer focus drive everything we do. We believe in building lasting relationships founded on trust and mutual growth.",
  },
];

const milestones = [
  { year: "2003", title: "Company Founded", description: "Adenola & Sons was established in Lagos, Nigeria." },
  { year: "2006", title: "First Major Partnership", description: "Secured distribution partnership with Mars International." },
  { year: "2010", title: "National Expansion", description: "Expanded operations to 8 branches across Nigeria." },
  { year: "2014", title: "Manufacturing Division", description: "Launched manufacturing capabilities for local product lines." },
  { year: "2018", title: "500+ Team Members", description: "Grew workforce to over 500 dedicated professionals." },
  { year: "2023", title: "20 Years of Excellence", description: "Celebrated two decades of quality distribution and service." },
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

export default function AboutPage() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDirectors() {
      try {
        const res = await fetch("/api/directors?active=true");
        if (res.ok) {
          const data = await res.json();
          setDirectors(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch directors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDirectors();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/assets/images/abt1.jpg"
          alt="About Adenola & Sons"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              About Us
            </span>
            <h1 className="text-5xl md:text-6xl font-bebas text-white mt-3 mb-4 tracking-wide">
              Who We Are
            </h1>
            <p className="text-gray-200 max-w-2xl text-lg">
              An indigenous firm involved in the marketing and sales of FMCG
              and other allied products across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/assets/images/forklift.jpg"
                    alt="Adenola & Sons Operations"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-accent text-white p-8 rounded-2xl shadow-xl">
                  <p className="text-4xl font-bold font-bebas">20+</p>
                  <p className="text-sm font-medium">Years of Excellence</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <span className="text-accent font-medium text-sm tracking-widest uppercase">
                Our Story
              </span>
              <h2 className="text-4xl font-bebas text-primary mt-3 mb-6 tracking-wide">
                Building a Legacy of Quality Distribution
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Adenola & Sons is an indigenous firm involved in the
                marketing and sales of FMCG (fast moving consumer goods) and
                other allied products to meet the needs of our customers.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Adenola & Sons, we strive to create and sustain mutually profitable
                relationships between us and all our customers through our
                culture of providing quality products, responsive sales services,
                integrity, and an ample mix of human resources and technology.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our multi-disciplinary team of young innovative personnel has
                positioned us as one of the leading distribution firms in
                Nigeria. With a nationwide network spanning eight branches, we
                ensure that quality consumer products reach every corner of the
                country.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We are proud partners of world-renowned brands including Mars
                International, Wrigley, GlaxoSmithKline, Reckitt Benckiser, and
                many others, distributing their products with the highest
                standards of excellence.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center">
                    <FaUsers className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary font-bebas">500+</p>
                    <p className="text-sm text-gray-500">Team Members</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center">
                    <FaGlobeAfrica className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary font-bebas">8</p>
                    <p className="text-sm text-gray-500">Branch Offices</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center">
                    <FaHandshake className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary font-bebas">50+</p>
                    <p className="text-sm text-gray-500">Global Partners</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center">
                    <FaAward className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary font-bebas">20+</p>
                    <p className="text-sm text-gray-500">Years Experience</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              What Drives Us
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              Our Core Principles
            </h2>
            <div className="section-divider mx-auto mb-6" />
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <AnimatedSection key={item.title}>
                <div className="bg-white p-8 rounded-2xl shadow-sm card-hover h-full">
                  <div className="w-16 h-16 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bebas text-primary mb-4 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Our Journey
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              Key Milestones
            </h2>
            <div className="section-divider mx-auto mb-6" />
          </AnimatedSection>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/10 -translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={milestone.year}>
                  <div
                    className={`flex flex-col md:flex-row items-center gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`flex-1 ${
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <div className="bg-cream p-6 rounded-2xl">
                        <span className="text-accent font-bold text-lg font-bebas">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-bebas text-primary mt-1 tracking-wide">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-2">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-4 h-4 rounded-full bg-accent border-4 border-white shadow-md z-10 flex-shrink-0" />
                    <div className="flex-1" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Leadership
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              Board of Directors
            </h2>
            <div className="section-divider mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our leadership team brings together decades of experience in
              FMCG distribution, business strategy, and operational excellence.
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden">
                  <div className="h-72 skeleton" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 skeleton w-3/4" />
                    <div className="h-4 skeleton w-1/2" />
                    <div className="h-4 skeleton w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : directors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {directors.map((director) => (
                <AnimatedSection key={director._id}>
                  <div className="bg-white rounded-2xl overflow-hidden card-hover group">
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={director.imageUrl || "/assets/images/milestone.png"}
                        alt={director.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {director.linkedinUrl && (
                          <a
                            href={director.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                          >
                            <FaLinkedin className="w-4 h-4" />
                          </a>
                        )}
                        {director.twitterUrl && (
                          <a
                            href={director.twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                          >
                            <FaTwitter className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bebas text-primary tracking-wide">
                        {director.name}
                      </h3>
                      <p className="text-accent text-sm font-medium mt-1">
                        {director.position}
                      </p>
                      <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                        {director.bio}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Director profiles coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/assets/images/container.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">
            Want to Work With Us?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join our team of dedicated professionals and be part of
            Nigeria&apos;s leading FMCG distribution network.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/careers"
              className="bg-accent text-white px-8 py-3.5 rounded-lg font-medium hover:bg-accent-dark transition-all duration-300 hover:shadow-lg flex items-center gap-2"
            >
              View Careers <FaArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3.5 rounded-lg font-medium hover:bg-white hover:text-primary transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
