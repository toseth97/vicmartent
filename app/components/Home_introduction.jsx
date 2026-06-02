"use client";
import React from "react";
import ForkLift from "../assets/images/forklift.jpg";
import Distribution from "../assets/images/distribution.webp";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdArrowRight, MdOpenInNew } from "react-icons/md";

const Home_introduction = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section className="w-full overflow-hidden bg-white">
            {/* About Section */}
            <div className="section-padding section-container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Text Content */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                About Adenola & Sons
                            </h2>
                            <div className="w-12 h-1 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full"></div>
                        </div>

                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                Adenola & Sons is an indigenous firm involved in the marketing and sales of FMCG (fast moving consumer goods) and other allied products to meet the needs of our customers.
                            </p>
                            <p>
                                At Adenola & Sons, we strive to create and sustain mutually profitable relationships between us and all our customers through our culture of providing quality products, responsive sales services, integrity, and an ample mix of human resources and technology.
                            </p>
                            <p>
                                With our multi-disciplinary team of young innovative personnel, we are poised to become one of the leading distribution firms in Nigeria.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/about" className="btn-primary inline-flex items-center justify-center gap-2 group">
                                Learn More
                                <MdArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/contact" className="btn-secondary inline-flex items-center justify-center gap-2">
                                Get in Touch
                            </Link>
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        variants={itemVariants}
                        className="relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300"
                    >
                        <Image
                            src={ForkLift}
                            alt="Adenola & Sons Operations"
                            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Our Business Section */}
            <div className="section-padding section-container bg-gradient-subtle">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-12"
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Our Business Vision
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            We work in every major area of development. We provide a wide array of consumer products and share and apply innovative knowledge and solutions to the needs of our suppliers and consumers.
                        </p>
                    </motion.div>

                    {/* Business Content Card */}
                    <motion.div
                        variants={itemVariants}
                        className="card p-8 lg:p-12"
                    >
                        <div className="space-y-6">
                            <p className="text-gray-700 leading-relaxed text-lg">
                                Adenola & Sons is a multi-faceted company distributing products that touch the lives of our consumers. Customer commitment and loyalty is paramount for our long-term success. We are committed to providing quality products and responsive sales services that meet the evolving needs of our customers.
                            </p>

                            {/* Core Values Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                                <motion.div
                                    variants={itemVariants}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">Quality Products</h3>
                                        <p className="text-sm text-gray-600">Delivering superior goods that improve customer lives</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">Responsive Service</h3>
                                        <p className="text-sm text-gray-600">Quick and reliable customer support and sales</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">Integrity First</h3>
                                        <p className="text-sm text-gray-600">Operating with honesty in all business dealings</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={itemVariants}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">Innovation</h3>
                                        <p className="text-sm text-gray-600">Leveraging technology and talented personnel</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Distribution Showcase */}
                    <motion.div
                        variants={itemVariants}
                        className="relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 group"
                    >
                        <Image
                            src={Distribution}
                            alt="Distribution Network"
                            width={800}
                            height={400}
                            className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent flex items-center justify-center">
                            <Link
                                href="/distribution"
                                className="btn-white inline-flex items-center gap-2 group/btn"
                            >
                                Explore Our Distribution
                                <MdArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Home_introduction;
