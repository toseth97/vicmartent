"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTruck,
  FaIndustry,
  FaHandshake,
  FaAward,
  FaUsers,
  FaGlobeAfrica,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useScrollAnimation } from "@/lib/hooks";

const heroSlides = [
  {
    image: "/assets/images/Home_Image.jpg",
    title: "We Distribute Superior Products and Services that Improves the Life of Consumers",
    subtitle: "Leading FMCG distribution across Nigeria",
  },
  {
    image: "/assets/images/Home_Image_2.jpg",
    title: "Building Strong Partnerships with Global Brands for Nigerian Consumers",
    subtitle: "Quality products, responsive services",
  },
  {
    image: "/assets/images/container.jpg",
    title: "Nationwide Distribution Network Delivering Excellence Every Day",
    subtitle: "From warehouse to shelf, we deliver",
  },
];

const stats = [
  { icon: FaUsers, value: "500+", label: "Team Members" },
  { icon: FaGlobeAfrica, value: "8", label: "Branch Offices" },
  { icon: FaHandshake, value: "50+", label: "Global Partners" },
  { icon: FaAward, value: "20+", label: "Years of Excellence" },
];

const services = [
  {
    icon: FaTruck,
    title: "Distribution",
    description:
      "Nationwide distribution network ensuring products reach every corner of Nigeria with efficiency and reliability.",
    href: "/distribution",
  },
  
  {
    icon: FaHandshake,
    title: "Partnerships",
    description:
      "Strategic partnerships with global FMCG brands to deliver superior products to Nigerian consumers.",
    href: "/about",
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

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [counters, setCounters] = useState({ members: 0, branches: 0, partners: 0, years: 0 });
  const [statsVisible, setStatsVisible] = useState(false);

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Stats counter animation
  useEffect(() => {
    if (statsVisible) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setCounters({
          members: Math.floor(500 * progress),
          branches: Math.floor(8 * progress),
          partners: Math.floor(50 * progress),
          years: Math.floor(20 * progress),
        });
        if (step >= steps) clearInterval(timer);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [statsVisible]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt="Adenola & Sons"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bebas text-white leading-tight tracking-wide mb-6">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-lg text-gray-200 mb-8 max-w-2xl">
                  {heroSlides[currentSlide].subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/about"
                    className="bg-accent text-white px-8 py-3.5 rounded-lg font-medium hover:bg-accent-dark transition-all duration-300 hover:shadow-lg flex items-center gap-2"
                  >
                    Learn More <FaArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/contact"
                    className="border-2 border-white text-white px-8 py-3.5 rounded-lg font-medium hover:bg-white hover:text-primary transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Controls */}
            <div className="flex items-center gap-4 mt-12">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 bg-accent"
                        : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Next slide"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/assets/images/forklift.jpg"
                    alt="Adenola & Sons Operations"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-2xl shadow-xl">
                  <p className="text-3xl font-bold font-bebas">20+</p>
                  <p className="text-sm">Years of Excellence</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <span className="text-accent font-medium text-sm tracking-widest uppercase">
                About Us
              </span>
              <h2 className="text-4xl font-bebas text-primary mt-3 mb-6 tracking-wide">
                Leading FMCG Distribution in Nigeria
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
              <p className="text-gray-600 leading-relaxed mb-8">
                With our multi-disciplinary team of young innovative personnel,
                we are poised to become one of the leading distribution firms in
                Nigeria.
              </p>
              <Link
                href="/about"
                className="btn-primary inline-flex items-center gap-2"
              >
                Learn More <FaArrowRight className="w-3 h-3" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              What We Do
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              Our Business
            </h2>
            <div className="section-divider mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              We work in every major area of development. We provide a wide
              array of consumer products and share and apply innovative
              knowledge and solutions to the needs of our suppliers and
              consumers.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title}>
                <Link
                  href={service.href}
                  className="block bg-white p-8 rounded-2xl shadow-sm card-hover group"
                >
                  <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bebas text-primary mb-3 tracking-wide">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="text-accent text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn More <FaArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-20 bg-primary relative overflow-hidden"
        ref={(el) => {
          if (el) {
            const observer = new IntersectionObserver(
              ([entry]) => {
                if (entry.isIntersecting) setStatsVisible(true);
              },
              { threshold: 0.3 }
            );
            observer.observe(el);
          }
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/assets/images/container.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { ...stats[0], count: counters.members },
              { ...stats[1], count: counters.branches },
              { ...stats[2], count: counters.partners },
              { ...stats[3], count: counters.years },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-accent" />
                </div>
                <p className="text-4xl md:text-5xl font-bold font-bebas text-white mb-2">
                  {stat.count}
                  {stat.value.includes("+") ? "+" : ""}
                </p>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent font-medium text-sm tracking-widest uppercase">
              Our Products
            </span>
            <h2 className="text-4xl font-bebas text-primary mt-3 mb-4 tracking-wide">
              Brands We Distribute
            </h2>
            <div className="section-divider mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              We distribute a wide range of FMCG products from world-renowned
              brands, ensuring quality products are always within reach of
              Nigerian consumers.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Food Products",
                image: "/assets/images/food.webp",
                href: "/products",
                desc: "Premium food brands including Mars, Snickers, Bounty, Twix, and more.",
              },
              {
                title: "Beverages",
                image: "/assets/images/beverage.webp",
                href: "/products",
                desc: "Refreshing beverages from top brands like Lucozade, Ribena, and Powerhouse.",
              },
              {
                title: "Non-Food Products",
                image: "/assets/images/non-food.webp",
                href: "/products",
                desc: "Personal care and household products from Nivea, Gillette, Duracell, and more.",
              },
            ].map((category) => (
              <AnimatedSection key={category.title}>
                <Link
                  href={category.href}
                  className="group relative h-72 rounded-2xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bebas text-white tracking-wide mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-200 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.desc}
                    </p>
                    <span className="text-accent text-sm font-medium flex items-center gap-2">
                      Explore <FaArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bebas text-white tracking-wide mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Whether you are looking for distribution partnerships, career
              opportunities, or simply want to learn more about our products
              and services, we would love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-accent px-8 py-3.5 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:shadow-lg"
              >
                Contact Us
              </Link>
              <Link
                href="/careers"
                className="border-2 border-white text-white px-8 py-3.5 rounded-lg font-medium hover:bg-white hover:text-accent transition-all duration-300"
              >
                View Careers
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      </section>
    </>
  );
}
