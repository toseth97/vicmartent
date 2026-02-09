"use client";

import { Bebas_Neue } from "next/font/google";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Import Distribution-specific images
import Distribution_Img from "../assets/images/distribution.webp";

import "../assets/css/Hero.css";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

const DistributionHero = ({ props }) => {
    return (
        <section
            className={`w-[100vw] lg:h-[90vh] h-[60vh] hero flex flex-col items-center justify-center overflow-hidden relative ${bebas.className}`}
        >
            {/* Overlay shade */}
            <div className="w-full lg:h-full h-[60vh] shade absolute top-0"></div>

            {/* Slideshow */}

            <Image
                src={Distribution_Img}
                alt="Distribution Hero"
                fill
                className=" w-full object-fit-cover lg:h-full h-[60vh] "
            />

            {/* Heading */}
            <div className="lg:w-9/12 w-11/12 z-10">
                <motion.h1
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="lg:text-6xl tracking-widest text-3xl font-bold text-white uppercase text-center"
                >
                    {props ? props : "Streamlining Your Distribution Network"}
                </motion.h1>
            </div>
        </section>
    );
};

export default DistributionHero;
