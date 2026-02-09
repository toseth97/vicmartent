"use client";

import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import ColgateAward from "../assets/images/press/colgate-award.jpg";
import OrnuaVisit from "../assets/images/press/ornua-visit.jpg";
import RB_Award from "../assets/images/press/rb-award.jpg";
import KerrygoldInauguration from "../assets/images/press/kerrygold-inauguration.jpg";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

const PressContent = () => {
    return (
        <section
            id="portfolio"
            className={`portfolio section-bg w-full py-20 bg-gray-50 ${poppins.className}`}
        >
            <div className="container mx-auto px-6 md:px-20">
                <div className="text-center mb-12">
                    <p className="text-4xl font-bold uppercase">
                        PRESS AND ANNOUNCEMENT
                    </p>
                </div>

                <div className="portfolio-container space-y-8">
                    {/* First Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="portfolio-item">
                            <div className="h-64">
                                <Image
                                    src={ColgateAward}
                                    alt="Awards from Colgate"
                                    className="object-cover rounded-lg w-full h-full"
                                    height={400}
                                    width={400}
                                />
                            </div>
                            <div className="text-center p-6">
                                <p className="text-2xl font-semibold mb-4">
                                    Fareast Mercantile Ghana Wins Best
                                    Distributor Award from Colgate
                                </p>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    The name Fareast Mercantile Company has
                                    become synonymous with excellence in the
                                    distribution industry as the company in
                                    faraway South Africa has been recognised by
                                    her clients on the global…
                                </p>
                            </div>
                        </div>

                        <div className="portfolio-item">
                            <div className="">
                                <Image
                                    src={OrnuaVisit}
                                    alt="Ornua CEO Visit"
                                    className="object-cover rounded-lg w-full"
                                    height={400}
                                    width={400}
                                />
                            </div>
                            <div className="text-center p-6">
                                <p className="text-2xl font-semibold mb-4">
                                    Ornua CEO Visit
                                </p>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    Plant Manager, Eagle Industries, Balaji
                                    Waghmare (left); General Manager,Ornua
                                    Africa, Bruce Denyer; Group Chief Executive
                                    Officer, Kevin Lane; Group Chief Operations
                                    Officer, Anthony Proctor; Chief Executive
                                    Officer, Ornua Foods, John…
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="portfolio-item">
                            <div className="h-64">
                                <Image
                                    src={RB_Award}
                                    alt="RB Award"
                                    className="object-cover rounded-lg w-full h-full"
                                    height={400}
                                    width={400}
                                />
                            </div>
                            <div className="text-center p-6">
                                <p className="text-2xl font-semibold mb-4">
                                    Fareast Mercantile Ghana Wins Best
                                    Distributor Award from Reckitt Benckiser
                                </p>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    The name Fareast Mercantile Company has
                                    become synonymous with excellence in the
                                    distribution industry as the company in
                                    faraway South Africa has been recognised by
                                    her clients on the global…
                                </p>
                            </div>
                        </div>

                        <div className="portfolio-item">
                            <div className="h-64">
                                <Image
                                    src={KerrygoldInauguration}
                                    alt="Kerrygold Inauguration"
                                    className="object-cover rounded-lg w-full h-full"
                                    height={400}
                                    width={400}
                                />
                            </div>
                            <div className="text-center p-6">
                                <p className="text-2xl font-semibold mb-4">
                                    Ornua partners Fareast Mercantile, opens new
                                    Kerrygold packaging factory in Nigeria
                                </p>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    Our CCNA Routing and Switching course is
                                    designed to prepare you with the relevant
                                    skills needed for the growing industry as a
                                    Network Engineer.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PressContent;
