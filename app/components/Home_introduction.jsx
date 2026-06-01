"use client";
import { Poppins } from "next/font/google";
import React from "react";
import ForkLift from "../assets/images/forklift.jpg";
import Distribution from "../assets/images/distribution.webp";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { MdOpenInNew as FaExternalLink } from "react-icons/md";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const Home_introduction = () => {
    return (
        <section
            className={`w-[100vw] overflow-hidden flex items-center justify-center flex-col bg-white home_intro ${poppins.className}`}
        >
            <div className="w-4/5 flex lg:flex-row flex-col items-center lg:justify-between lg:gap-16 gap-4 justify-center">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-justify text-sm opacity-80 lg:w-4/6 w-full"
                >
                    <p className="my-2 opacity-80 preview_hidden">
                        Vicmart Enterprises Limited is an indigenous firm
                        involved in the marketing and sales of FMCG (fast moving
                        consumer goods) and other allied products to meet the
                        needs of our customers.
                    </p>
                    <p className="my-2 opacity-80 preview_hidden">
                        At Vicmart, we strive to create and sustain mutually
                        profitable relationships between us and all our
                        customers through our culture of providing quality
                        products, responsive sales services, integrity, and an
                        ample mix of human resources and technology.
                    </p>
                    <p className="my-2 opacity-80 preview_hidden">
                        With our multi-disciplinary team of young innovative
                        personnel, we are poised to become one of the leading
                        distribution firms in Nigeria.
                    </p>
                    <p className="my-2 opacity-80 preview_hidden">
                        We are passionate about quality product and selfless
                        service delivery, distributing superior products and
                        services that improves the life of consumers.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="lg:w-3/6 w-full rounded-xl mx-auto flex justify-center"
                >
                    <Image
                        src={ForkLift}
                        alt="forklift"
                        className="object-fit-cover h-auto w-full rounded-xl preview_hidden"
                        fill={false}
                    />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                className=" overflow-hidden relative flex items-center justify-center view_more_btn mt-8"
            >
                <Link
                    href=""
                    className="py-2 px-16 border-2 rounded border-indigo-950 text-sm z-10 font-semibold"
                >
                    View More
                </Link>
                <div className="w-[35rem] h-16 bg-indigo-950 absolute"></div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-full mt-4 py-8 py-4 business_section flex flex-col items-center justify-center "
            >
                <div className="flex flex-col items-center justify-center w-4/5">
                    <h1 className="font-bold text-center lg:text-3xl text-2xl py-2 mb-4 preview_hidden">
                        Our Business
                    </h1>
                    <p className="text-sm opacity-80 text-justify lg:text-center preview_hidden">
                        We work in every major area of development. We provide a
                        wide array of consumer products and share and apply
                        innovative knowledge and solutions to the needs of our
                        suppliers and consumers. We are committed to delivering
                        superior products and services that improve the lives of
                        consumers.
                    </p>
                    <div className="flex lg:flex-row flex-col items-center lg:justify-between justify-center w4/5 lg:gap-16 gap-8 my-8 preview_hidden">
                        {/* <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="lg:w-3/6 w-full rounded-xl mx-auto flex justify-center overflow-hidden preview_hidden"
                        >
                            <Image
                                src={Manufacture}
                                alt="manufacture"
                                className="object-fit-cover h-auto w-full rounded-xl hover:scale-125 duration-700"
                                fill={false}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="lg:w-3/6 w-full rounded-xl mx-auto flex justify-center overflow-hidden"
                        >
                            <Image
                                src={Distribution}
                                alt="distribution"
                                className="object-fit-cover h-auto w-full rounded-xl hover:scale-125 duration-700"
                                fill={false}
                            />
                        </motion.div> */}
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="portfolio-wrap relative overflow-hidden rounded-lg shadow-md"
                        >
                            <Image
                                src={Distribution} // Placeholder
                                alt="Distribution"
                                width={400}
                                height={300}
                                className="img-fluid w-full h-64 o"
                            />
                            <div className="portfolio-info absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <div className="portfolio-links">
                                    <Link
                                        href="/distribution"
                                        title="More Details"
                                        className="text-white"
                                    >
                                        <FaExternalLink className="text-6xl text-bold" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <p className="text-sm opacity-80 lg:text-center text-justify lg:p-16 p-6 bg-white text-indigo-950 preview_hidden">
                        Vicmart Enterprises Limited is a multi-faceted company
                        distributing products that touch the lives of our
                        Holding consumers&apos;
                        commitment and loyalty is paramount for our long-term
                        success. We are committed to providing quality products
                        and responsive sales services that meet the evolving
                        needs of our customers.
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Home_introduction;
