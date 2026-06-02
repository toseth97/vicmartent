"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

/**
 * Reusable hero component to match app/components/Hero.jsx (homepage)
 */
const AnimatedHero = ({
  heroImages = [],
  badgeText = "Leading Distribution Solutions",
  title = "Distribute Superior Products & Services",
  subtitle =
    "We improve lives through premium consumer goods and trusted distribution networks across multiple channels.",
  ctaPrimary = { href: "/about", label: "Learn More" },
  ctaSecondary = { href: "/contact", label: "Get in Touch" },
  showStats = true,
}) => {
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);

  // Keep index safe. No state updates here to avoid cascading-render warnings.
  useEffect(() => {
    // intentionally empty
  }, [heroImages.length]);

  useEffect(() => {
    if (!heroImages || heroImages.length <= 1) return;

    const change = setInterval(() => {
      setIndex((prevIndex) => prevIndex + 1);
      setKey((prevKey) => prevKey + 1);
    }, 10000);

    return () => clearInterval(change);
  }, [heroImages]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

return (
    <section className={`w-full min-h-screen lg:h-screen hero flex flex-col items-center justify-center overflow-hidden relative pt-20 ${poppins.className}`}>
      {/* Background Images */}
      {heroImages?.[index] && (
        <motion.div
          key={key}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[index]}
            alt="Hero background"
            className="w-full h-full object-cover"
            priority
          />
        </motion.div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/70 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto px-4 lg:px-8 w-full flex items-center justify-center h-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-1/2 py-20 lg:py-0 flex flex-col justify-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full w-fit mb-6">
              <div className="w-2 h-2 bg-secondary-400 rounded-full" />
              <span className="text-sm font-semibold text-white">{badgeText}</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {title}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg lg:text-xl text-white/90 mb-8 max-w-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Link
              href={ctaPrimary?.href || "/about"}
              className="btn-primary inline-flex items-center justify-center gap-2 group"
            >
              {ctaPrimary?.label || "Learn More"}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={ctaSecondary?.href || "/contact"}
              className="px-8 py-3 bg-white text-primary-900 font-semibold rounded-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-lg active:scale-95"
            >
              {ctaSecondary?.label || "Get in Touch"}
            </Link>
          </motion.div>

          {/* Stats */}
          {showStats && (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20"
            >
              <div>
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-sm text-white/70">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">5K+</div>
                <div className="text-sm text-white/70">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-white/70">Locations</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-white/70">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-center justify-center">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AnimatedHero;

