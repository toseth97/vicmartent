"use client";

import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

const CareerContent = () => {
    return (
        <section
            className={`w-full flex flex-col items-center justify-center px-6 md:px-20 ${poppins.className}`}
        >
            {/* Mission / Vision / Values */}

            {/* Company Overview */}

            {/* Company History */}
            <div className="bg-gray-50 py-16 w-full test-sm">
                <div className="text-center max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl tracking-widest font-bold mb-6 uppercase">
                        Explore your career options
                    </h2>
                    <p className="opacity-80 text-sm">
                        Join us to help create a better world. We are always
                        looking for talented professionals. Here are the current
                        open positions you can apply today
                    </p>
                    <div className="pb-8">
                        <Link
                            className=" mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition-all duration-300 inline-block"
                            href="/careers/jobs"
                        >
                            Current Openings
                        </Link>
                    </div>
                    <div className="md:mt-8 flex flex-col items-center justify-center gap-6">
                        <h2 className="text-3xl tracking-wide">
                            {" "}
                            Why Work With US
                        </h2>
                        <p className="opacity-80 text-sm">
                            The company aims to achieve the following:
                        </p>
                        <ul className="text-sm opacity-80 text-left list-disc list-inside">
                            <li>
                                To afford every employee the opportunity of
                                proving his/her ability to qualify for a higher
                                position within the company
                            </li>
                            <li>
                                To provide employees, selected on the grounds of
                                merit and capability with opportunities to
                                improve their knowledge or skill, preparing them
                                for higher responsibility
                            </li>
                            <li>
                                To reward honesty, integrity, loyalty,
                                efficiency and thoroughness
                            </li>
                            <li>
                                To foster good relations between employees and
                                management
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerContent;
