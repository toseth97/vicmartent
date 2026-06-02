"use client";

import React from "react";
import Image from "next/image";
import Milestone1 from "../assets/images/milestone.png";
import Milestone2 from "../assets/images/milestone.png";

const AboutContent = () => {
    return (
        <section className="w-full flex flex-col items-center justify-center px-6 md:px-20">
            {/* Mission / Vision / Values */}
            <div className="grid md:grid-cols-3 gap-8 py-4 w-full preview_hidden">
                <div
                    className="bg-white shadow-md p-6 rounded text-center  hover:text-white 
                hover:bg-[rgba(19,13,48,0.85)] 
                hover:scale-105 hover:shadow-xl 
                transition-all duration-500 ease-in-out 
                "
                >
                    <h2 className="text-center text-2xl font-semibold mb-4 tracking-widest">
                        Mission
                    </h2>
                    <p className=" text-sm transition-all duration-500 ease-in-out">
                        To place products across the country ensuring
                        Affordability, Availability, Visibility and
                        Accessibility within arm's reach of the consumer.
                    </p>
                </div>

                <div
                    className="bg-white shadow-md p-6 rounded text-center hover:text-white 
                hover:bg-[rgba(19,13,48,0.85)] 
                hover:scale-105 hover:shadow-xl 
                transition-all duration-500 ease-in-out"
                >
                    <h2 className="text-center text-2xl tracking-widest font-semibold mb-4">
                        Vision
                    </h2>
                    <p className=" text-sm hover:text-white transition-all duration-500 ease-in-out">
                        To be the leading Sales, Supply Chain and Distribution
                        company in Nigeria.
                    </p>
                </div>

                <div
                    className="bg-white shadow-md p-6 rounded text-center hover:text-white 
                hover:bg-[rgba(19,13,48,0.85)] 
                hover:scale-105 hover:shadow-xl 
                transition-all duration-500 ease-in-out"
                >
                    <h2 className="text-center text-2xl font-semibold mb-4 tracking-widest">
                        Values
                    </h2>
                    <p className="text-sm hover:text-white transition-all duration-500 ease-in-out">
                        Think and plan long-term, always be fair to all
                        concerned, respect the laws of the land, ensure a
                        healthy & profitable business, and practice caring
                        capitalism.
                    </p>
                </div>
            </div>

            {/* Company Overview */}
            <div className="grid md:grid-cols-2 gap-10 py-16 w-full test-sm text-gray-700">
                <div>
                    <p>
                        Vicmart Enterprises Limited is an indigenous firm
                        involved in the marketing and sales of FMCG (fast moving
                        consumer goods) and other allied products to meet the
                        needs of our customers.
                    </p>
                    <p className="mt-4">
                        At Vicmart, we strive to create and sustain mutually
                        profitable relationships between us and all our
                        customers through our culture of providing quality
                        products, responsive sales services, integrity, and an
                        ample mix of human resources and technology.
                    </p>
                    <p className="mt-4">
                        With our multi-disciplinary team of young innovative
                        personnel, we are poised to become one of the leading
                        distribution firms in Nigeria.
                    </p>
                </div>
                <div>
                    <p>
                        We are passionate about quality product and selfless
                        service delivery, distributing superior products and
                        services that improves the life of consumers.
                    </p>
                    <p className="mt-4">
                        Our commitment to excellence drives us to provide
                        quality products and responsive sales services that meet
                        the evolving needs of our customers.
                    </p>
                    <p className="mt-4">
                        We believe in creating mutually profitable relationships
                        and practicing ethical business conduct in all our
                        operations.
                    </p>
                </div>
            </div>

            {/* Company History */}
            <div className="bg-gray-50 py-16 w-full test-sm">
                <div className="text-center max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6 tracking-widest">
                        Company History
                    </h2>
                    <p className="text-gray-700">
                        Vicmart Enterprises Limited was founded with a vision to
                        become a leading distribution company in Nigeria. Our
                        journey began with a commitment to quality products and
                        exceptional service delivery, and we have grown steadily
                        by maintaining our core values of integrity, excellence,
                        and customer focus.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutContent;
