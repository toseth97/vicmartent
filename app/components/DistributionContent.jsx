"use client";

import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

const DistributionContent = () => {
    return (
        <section
            id="portfolio"
            className={`w-full flex flex-col items-center justify-center px-6 md:px-20 py-20 bg-gray-50 ${poppins.className}`}
        >
            <div className="container mx-auto">
                <div className="section-title text-center mb-12">
                    <h2 className="text-4xl font-bold mb-6 uppercase">
                        Distribution
                    </h2>
                </div>
                <p className="text-center max-w-4xl mx-auto mb-16 text-gray-700 leading-relaxed">
                    Started as a trading company over 125 years ago, AAVA Brands
                    Ltd has today diversified into Distribution, Manufacturing,
                    Retail & Exports with a wide product range of products in
                    various categories – Snacks, Dairy Products, Beverages,
                    Spices, Personal Care & More. We partner with clients on a
                    global scale to serve consumers, through our unmatched
                    distribution network in the region and profound market
                    knowledge, we provide all the essential services that help
                    brands grow in Africa.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 portfolio-container">
                    <div className="portfolio-item">
                        <div className="portfolio-wrap bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="relative h-48">
                                <Image
                                    src="/assets/images/distribution/Nivea.jpg"
                                    alt="Nivea Body Lotion"
                                    width={400}
                                    height={300}
                                    className="object-cover"
                                />
                            </div>
                            <div className="portfolio-info p-4">
                                <div className="portfolio-links flex justify-center">
                                    {/* <a href="/uploads/NiveaBodyLotion1-660x410.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox" title="">
                                        <i className="bx bx-plus"></i>
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="portfolio-item">
                        <div className="portfolio-wrap bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="relative h-48">
                                <Image
                                    src="/assets/images/distribution/Mmss.jpg"
                                    alt="M&Ms"
                                    className="object-cover"
                                    width={400}
                                    height={300}
                                />
                            </div>
                            <div className="portfolio-info p-4">
                                <div className="portfolio-links flex justify-center"></div>
                            </div>
                        </div>
                    </div>

                    <div className="portfolio-item">
                        <div className="portfolio-wrap bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="relative h-48">
                                <Image
                                    src="/assets/images/distribution/Kerrygold.jpg"
                                    alt="Kerrygold Butter"
                                    width={400}
                                    height={300}
                                    className="object-cover"
                                />
                            </div>
                            <div className="portfolio-info p-4">
                                <div className="portfolio-links flex justify-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DistributionContent;
