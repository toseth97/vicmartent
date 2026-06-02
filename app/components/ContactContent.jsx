"use client";

import { useState, useEffect } from "react";
import { FaBuilding } from "react-icons/fa";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
export default function ContactContent() {
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchBranches = async () => {
            const res = await fetch("/api/branches", { cache: "no-store" });
            const data = await res.json();
            setBranches(data);
        };
        fetchBranches();
    }, []);

    return (
        <div className={`w-full ${poppins.className}`}>
            {/* Contact Section */}
            <motion.section
                className="py-16"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.15 }}
            >

                <div className="container mx-auto px-6 preview_hidden">
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Left Info */}
                        <div className="bg-white p-8 shadow rounded border border-gray-200">
                            <p className="text-2xl font-bold mb-6 text-center">
                                Contact Us
                            </p>

                            <span className="mb-4 text-sm">
                                <strong>Address:</strong>
                                <br />
                                 <div>Block C, Plot 2, Oluyole Extension,</div>
                  <div>Oluyole, Ibadan.</div>
                            </span>

                            <span className="mb-4 text-sm">
                                <strong>Email:</strong>

                                <p>enquiries@adenolaandsons.com</p>
                                <br />
                            </span>

                            <span className="mb-4 text-sm">
                                <strong>Phone:</strong>

                                <p> +234-80-5509-6909</p>
                                <br />
                            </span>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 shadow rounded border border-gray-200">
                            <form
                                method="POST"
                                action="#"
                                className="space-y-4"
                            >
                                <input
                                    type="hidden"
                                    name="_token"
                                    value="HTqpWv6ANLylvhHMDVP3j96MvFgAV8PNdh4kg6GJ"
                                />

                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        required
                                        className="border-b p-3 rounded w-full text-sm"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        required
                                        className="border-b p-3 rounded w-full text-sm"
                                    />
                                </div>

                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    required
                                    className="border-b p-3 rounded w-full text-sm"
                                />

                                <textarea
                                    name="message"
                                    rows="4"
                                    placeholder="Send Message"
                                    required
                                    className="border-b p-3 rounded w-full text-sm"
                                />

                                <button
                                    type="submit"
                                    className="bg-gray-800 text-white px-6 py-3 rounded hover:opacity-90 transition text-sm"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Google Map */}
            {/* <section className="w-full">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.824910665894!2d3.3479536783878285!3d6.543781076558141!"
                    width="100%"
                    height="350"
                    loading="lazy"
                    className="border-0"
                ></iframe>
            </section> */}

            {/* Branches */}
            {/* <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <p className="text-2xl font-bold text-center mb-8">
                        Our Branches
                    </p>

                    <div className="w-full flex items-center gap-6 text-gray-700 p-4">
                        <ul className="w-full grid md:grid-cols-2 justify-items-center gap-4">
                            {branches.map((branch) => (
                                <li
                                    key={branch.id}
                                    className="w-full bg-gray-100 p-4 rounded shadow text-sm group transition-all duration-1000 ease-in-out"
                                >
                                    <span className="text-lg flex items-center gap-2">
                                        <FaBuilding
                                            className="inline-block mr-2 text-red-500"
                                            size={15}
                                        />
                                        <strong className="text-red-500">
                                            {branch.city}
                                        </strong>
                                    </span>

                                    <br />

                                    <span
                                        className="
          block max-h-0 overflow-hidden opacity-0
    transition-[max-height,opacity] duration-1000 ease-in-out
    group-hover:max-h-40 group-hover:opacity-100

        "
                                    >
                                        <p>
                                            {" "}
                                            <strong>Address: </strong>
                                            {branch.address}
                                        </p>
                                        <p>
                                            <strong>Email: </strong>
                                            {branch.email}
                                        </p>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section> */}
        </div>
    );
}
