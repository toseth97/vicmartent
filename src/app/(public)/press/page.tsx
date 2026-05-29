"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaNewspaper, FaCalendarAlt, FaArrowRight, FaSearch, FaTag } from "react-icons/fa";
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

const categoryLabels: Record<string, string> = {
  corporate: "Corporate",
  csr: "CSR",
  awards: "Awards",
  partnership: "Partnership",
  other: "Other",
};

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

export default function PressPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events?limit=20");
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

  const filteredEvents = events.filter((event) => {
    const matchesCategory = activeCategory === "all" || event.category === activeCategory;
    const matchesSearch =
      !searchTerm ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["all", "corporate", "csr", "awards", "partnership", "other"];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/assets/images/press/press-1.jpg"
          alt="Press & News"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              News & Updates
            </span>
            <h1 className="text-5xl md:text-6xl font-bebas text-white mt-3 mb-4 tracking-wide">
              Press & Media
            </h1>
            <p className="text-gray-200 max-w-2xl text-lg">
              Stay updated with the latest news, events, and announcements
              from Vicmart Enterprises.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat === "all" ? "All" : categoryLabels[cat] || cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden">
                  <div className="h-56 skeleton" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 skeleton w-1/4" />
                    <div className="h-6 skeleton w-3/4" />
                    <div className="h-4 skeleton w-full" />
                    <div className="h-4 skeleton w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <AnimatedSection key={event._id}>
                  <article className="bg-white rounded-2xl overflow-hidden card-hover group h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={event.imageUrl || "/assets/images/press/press-1.jpg"}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-accent text-white text-xs rounded-full font-medium uppercase">
                          {categoryLabels[event.category] || event.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <FaCalendarAlt className="w-3 h-3 text-gray-400" />
                        <time className="text-gray-500 text-xs">
                          {new Date(event.date).toLocaleDateString("en-NG", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                      <h3 className="text-xl font-bebas text-primary tracking-wide mb-3 group-hover:text-accent transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
                        {event.description}
                      </p>
                      {event.location && (
                        <div className="flex items-center gap-1.5 mt-4 text-gray-500 text-xs">
                          <FaTag className="w-3 h-3" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FaNewspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bebas text-primary tracking-wide mb-2">
                {searchTerm || activeCategory !== "all"
                  ? "No matching articles found"
                  : "Press Releases Coming Soon"}
              </h3>
              <p className="text-gray-500 text-sm">
                {searchTerm || activeCategory !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Check back soon for the latest news and updates from Vicmart Enterprises."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">
            Media Inquiries?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            For press inquiries, interview requests, or media partnerships,
            please reach out to our communications team.
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
