"use client";

import { Bebas_Neue } from "next/font/google";
import Image from "next/image";
import { motion } from "framer-motion";

// Import Product-specific images
import Product_Img from "../assets/images/container.jpg";

import "../assets/css/Hero.css";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

const ProductHero = () => {
    return (
        <section
            className={`w-[100vw] lg:h-[90vh] h-[60vh] hero flex flex-col items-center justify-center overflow-hidden relative`}
        >
            {/* Overlay shade */}
            <div className="w-full lg:h-full h-[60vh] shade absolute top-0"></div>

            {/* Slideshow */}

            <Image
                src={Product_Img}
                alt="Product Hero"
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
                    className={`lg:text-6xl tracking-wide text-4xl font-bold text-white capitalize text-center ${bebas.className}`}
                >
                    OUR PRODUCTS
                </motion.h1>
            </div>
        </section>
    );
};

export default ProductHero;
