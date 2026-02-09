"use client";

import React from "react";
import { FaDroplet, FaUserDoctor } from "react-icons/fa6";
import { FiFile } from "react-icons/fi";
import CSR_Image from "../../assets/images/csr.jpg";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Csr = () => {
    const hiddenElementsRef = useRef([]); // Use useRef for element references

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log(entry);
                    entry.target.classList.add("preview_show");
                } else {
                    entry.target.classList.remove("preview_show");
                }
            });
        });

        // Improved selector: Target specific elements using class names
        const hiddenElements = document.querySelectorAll(".preview_hidden");

        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, [hiddenElementsRef.current]);

    return (
        <>
            {/* Hero Section */}
            <section id="home-sec" className="player relative w-full">
                <div className="aspect-video w-full">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/XS5HLEFibck?autoplay=1&mute=1&loop=1&playlist=XS5HLEFibck&controls=0&modestbranding=1&rel=0&vq=hd1080"
                        title="CSR Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>

            <br />

            <main id="main">
                {/* About Us Section */}
                <section id="about" className="about py-16">
                    <div className="container mx-auto px-4">
                        <div className="section-title text-center mb-12">
                            <p className="text-3xl font-bold">
                                CSR - In partnership with Tulsi Chanrai
                                Foundation
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-80 preview_hidden">
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <Image
                                    src={CSR_Image}
                                    className="img-fluid rounded-lg"
                                    alt=""
                                />
                            </motion.div>
                            <motion.div
                                className="pt-4 md:pt-0 content"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <p className="text-base text-black mb-4 opacity-80 preview_hidden">
                                    An organization’s performance can’t be
                                    defined only by its bottom-line revenue
                                    generation, but by the way it generates
                                    profits, and its contribution to building
                                    social, economic and environmental capital
                                    towards enhancing societal sustainability.
                                    Our corporate sustainability strategy
                                    focuses on enhancing the sustainability of
                                    the work we do with customers and suppliers.
                                    We use resources efficiently to add business
                                    value for our suppliers, with extreme focus
                                    on the health and well-being of our
                                    consumers, and to positively impact the
                                    communities and societies around us.
                                </p>
                                <p className="text-base text-black">
                                    Our ultimate goal is to foster happiness and
                                    well-being of people and communities and
                                    enable social transformation through
                                    empowered individuals. Adhering to strong
                                    environmental commitments, we continually
                                    look for opportunities to be more efficient
                                    to source and use eco-friendly materials in
                                    our products, equipment and services in our
                                    buildings and operations.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Our Services Section */}
                <section id="services" className="services py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="section-title text-center mb-12">
                            <p className="text-3xl font-bold">Activities</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-5">
                            <div className="icon-box bg-white p-6 rounded-lg shadow-md text-center">
                                <div className="icon text-4xl text-blue-500 mb-4">
                                    <FaDroplet />
                                </div>
                                <p className="title text-xl font-semibold mb-4">
                                    Mission For Water
                                </p>
                                <p className="description text-gray-600">
                                    Water is one of the most inaccessible basic
                                    needs of the Nigerian population. UNICEF
                                    data suggests that 50 percent of the people
                                    do not have access to safe and potable
                                    drinking water. Women and children trek
                                    miles to fetch water. Diarrhoea- a water
                                    borne disease, is the second highest cause
                                    of mortality of children under five years of
                                    age in Nigeria. Over 25000 hand pumps have
                                    been abandoned in Nigeria.
                                </p>
                            </div>

                            <div className="icon-box bg-white p-6 rounded-lg shadow-md text-center">
                                <div className="icon text-4xl text-blue-500 mb-4">
                                    <FiFile />
                                </div>
                                <p className="title text-xl font-semibold mb-4">
                                    Mission For Vision
                                </p>
                                <p className="description text-gray-600">
                                    Nigerian National Blindness and Visual
                                    Impairment Survey conducted in 2007 suggest
                                    that two out of every three Nigerians suffer
                                    from visual impairment. Blindness does not
                                    only hinder quality of life of the person
                                    but impact socio-economic condition of
                                    families, community and the Nation.
                                    According to experts, “If priority attention
                                    is not given, the number of blind and
                                    severely visually impaired adults in Nigeria
                                    will increase by greater than 40 per cent
                                    over the next decade."
                                </p>
                            </div>

                            <div className="icon-box bg-white p-6 rounded-lg shadow-md text-center">
                                <div className="icon text-4xl text-blue-500 mb-4">
                                    <FaUserDoctor />
                                </div>
                                <p className="title text-xl font-semibold mb-4">
                                    Mission For Primary Health
                                </p>
                                <p className="description text-gray-600">
                                    According to the National Demographic Health
                                    Survey in 2013 one-third of Nigerian women
                                    received no pre-natal care and two-thirds of
                                    Nigerian women deliver at home. Only half of
                                    recent births were protected against
                                    neo-natal tetanus. Only 25% of all children
                                    between the ages of 12-23 months had been
                                    fully vaccinated. Almost 21% had received no
                                    vaccination at all. In the two weeks leading
                                    up to the survey, an estimated 1-in-10
                                    children under five experienced a bout of
                                    diarrhea.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Csr;
