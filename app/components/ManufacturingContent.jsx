"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Manufacture from "../assets/images/manufacturing.jpg";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

const ManufacturingContent = () => {
    const [activeAccordion, setActiveAccordion] = useState("accordion-list-1");

    const toggleAccordion = (id) => {
        setActiveAccordion(activeAccordion === id ? "" : id);
    };

    return (
        <section
            className={`w-full flex flex-col items-center justify-center px-6 md:px-20 ${poppins.className}`}
        >
            {/* Portfolio Section */}
            <div className="w-full py-20">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 portfolio-container px-4">
                        <div className="lg:col-span-5 portfolio-item">
                            <div className="section-title mb-6">
                                <h2 className="text-4xl font-bold uppercase">
                                    Manufacturing
                                </h2>
                            </div>
                            <p className="text-gray-700 mb-4">
                                AAVA Brand's transition into the manufacturing
                                domain was part of its overall strategy and
                                vision of backward integration.
                            </p>
                            <p className="text-gray-700">
                                Kick started in the year 2003, the vision behind
                                this foray was the commitment to serve our
                                customers with the best quality products made
                                available at an arm's length.
                            </p>
                        </div>

                        <div className="lg:col-span-7 portfolio-item">
                            <div className="relative h-96 rounded">
                                <Image
                                    src={Manufacture}
                                    alt="Manufacturing"
                                    fill
                                    className="object-cover rounded-lg"
                                />

                                <div className="portfolio-info p-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Box Section */}
            <section className="info-box w-full py-20">
                <div className="container-fluid mx-auto">
                    <div className="flex flex-col justify-center items-stretch">
                        <div className="accordion-list">
                            <ul className="space-y-4">
                                <li>
                                    <button
                                        onClick={() =>
                                            toggleAccordion("accordion-list-1")
                                        }
                                        className="w-full text-left flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                                    >
                                        <span>Soap manufacturing</span>
                                        <div className="flex space-x-2">
                                            <i
                                                className={`bx bx-chevron-down icon-show transition-transform duration-300 ${activeAccordion === "accordion-list-1" ? "rotate-180" : ""}`}
                                            ></i>
                                            <i
                                                className={`bx bx-chevron-up icon-close transition-transform duration-300 ${activeAccordion === "accordion-list-1" ? "rotate-180" : ""}`}
                                            ></i>
                                        </div>
                                    </button>
                                    <div
                                        id="accordion-list-1"
                                        className={`overflow-hidden transition-all duration-300 ${activeAccordion === "accordion-list-1" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                                    >
                                        <div className="p-4 bg-white border-t">
                                            <p className="mb-2">
                                                <i className="fa fa-star-of-life text-red-500 text-xs mr-2"></i>{" "}
                                                Started operation in July 2011.
                                            </p>
                                            <p className="mb-2">
                                                <i className="fa fa-star-of-life text-red-500 text-xs mr-2"></i>{" "}
                                                Doing contract manufacturing for
                                                P&G, Colgate, PZ Cussons,
                                                Saroafrica International,
                                                Pacific Interlink.
                                            </p>
                                            <p className="mb-2">
                                                <i className="fa fa-star-of-life text-red-500 text-xs mr-2"></i>{" "}
                                                Capacity to produce up to 1000
                                                Tons/month.
                                            </p>
                                            <p>
                                                <i className="fa fa-star-of-life text-red-500 text-xs mr-2"></i>{" "}
                                                NAFDAC, ISO, SEDEX approved.
                                            </p>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <button
                                        onClick={() =>
                                            toggleAccordion("accordion-list-3")
                                        }
                                        className="w-full text-left flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                                    >
                                        <span>PePsico</span>
                                        <div className="flex space-x-2">
                                            <i
                                                className={`bx bx-chevron-down icon-show transition-transform duration-300 ${activeAccordion === "accordion-list-3" ? "rotate-180" : ""}`}
                                            ></i>
                                            <i
                                                className={`bx bx-chevron-up icon-close transition-transform duration-300 ${activeAccordion === "accordion-list-3" ? "rotate-180" : ""}`}
                                            ></i>
                                        </div>
                                    </button>
                                    <div
                                        id="accordion-list-3"
                                        className={`overflow-hidden transition-all duration-300 ${activeAccordion === "accordion-list-3" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                                    >
                                        <div className="p-4 bg-white border-t">
                                            <p className="mb-2">
                                                <i className="fa fa-star-of-life text-red-500 text-xs mr-2"></i>{" "}
                                                Collaboration with PePsico
                                            </p>
                                            <p className="mb-2">
                                                <i className="fa fa-star-of-life text-red-500 text-xs mr-2"></i>{" "}
                                                Started operation in Aug 2019.
                                            </p>
                                            <p className="mb-2">
                                                <i className="fa fa-star-of-life text-red-500 text-xs mr-2"></i>{" "}
                                                Capacity to produce up to 700
                                                Tons/month.
                                            </p>
                                            <p>
                                                <i className="fa fa-star-of-life text-red-500 text-xs mr-2"></i>{" "}
                                                NAFDAC, SON approved.
                                            </p>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <button
                                        onClick={() =>
                                            toggleAccordion("accordion-list-5")
                                        }
                                        className="w-full text-left flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                                    >
                                        <span>Suntory manufacturing</span>
                                        <div className="flex space-x-2">
                                            <i
                                                className={`bx bx-chevron-down icon-show transition-transform duration-300 ${activeAccordion === "accordion-list-5" ? "rotate-180" : ""}`}
                                            ></i>
                                            <i
                                                className={`bx bx-chevron-up icon-close transition-transform duration-300 ${activeAccordion === "accordion-list-5" ? "rotate-180" : ""}`}
                                            ></i>
                                        </div>
                                    </button>
                                    <div
                                        id="accordion-list-5"
                                        className={`overflow-hidden transition-all duration-300 ${activeAccordion === "accordion-list-5" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                                    >
                                        <div className="p-4 bg-white border-t">
                                            <p className="mb-2">
                                                <i className="fa fa-star-of-life text-red-500 text-xs mr-2"></i>{" "}
                                                Started operations on 2022 Aug
                                            </p>
                                            <p className="mb-2">
                                                <i className="fa fa-star-of-life text-red-500 text-xs mr-2"></i>{" "}
                                                Installed capacity of 75000
                                                KL/Annum
                                            </p>
                                            <p className="mb-2">
                                                <i className="fa fa-star-of-life text-red-500 text-xs mr-2"></i>{" "}
                                                Capacity to fill Hot Filed PET,
                                                Cold Field PET, TETRA, PET, CAN.
                                            </p>
                                            <p>
                                                <i className="fa fa-star-of-life text-red-500 text-xs mr-2"></i>{" "}
                                                NAFDAC and ISO Approved
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default ManufacturingContent;
