"use client";
import React from "react";
import Home_Image_1 from "../assets/images/Home_Image.jpg";
import Home_Image_2 from "../assets/images/Home_Image_2.jpg";
import "../assets/css/Hero.css";
import { delay, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
    const hero_data = [Home_Image_1, Home_Image_2];
    const [index, setIndex] = useState(0);
    const [key, setKey] = useState(0);

    useEffect(() => {
        const lastIndex = (hero_data.length = 1);

        if (index < 0) {
            setIndex(lastIndex);
        }
        if (index > lastIndex) {
            setIndex(0);
        }
    }, [index, hero_data]);

    useEffect(() => {
        const change = setInterval(() => {
            setIndex(index + 1);
            setKey((prevKey) => prevKey + 1);
        }, 10000);
        return () => clearInterval(change);
    }, [index]);

    return (
        <section className="w-[100vw] lg:h-[90vh] h-[60vh] hero flex flex-col items-center justify-center overflow-hidden relative">
            <div className="w-full lg:h-full h-[60vh] shade absolute top-0 "></div>
            <motion.div
                key={key}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="w-full"
            >
                {hero_data[index] && (
                    <Image
                        src={hero_data[index]}
                        alt="warehouse"
                        className="hero_image w-full object-fit-cover lg:h-full h-[60vh] absolute top-0"
                        width={1920}
                        height={1080}
                    />
                )}
            </motion.div>

            <div className="lg:w-9/12 w-11/12 z-10">
                <motion.h1
                    key={key}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="lg:text-6xl text-3xl tracking-widest font-bold text-white capitalize text-center "
                >
                    We Distribute Superior Products and Services that Improves
                    the Life of Consumers
                </motion.h1>
            </div>

            <motion.div
                initial={{ y: 1000 }}
                animate={{ y: -40 }}
                transition={{ duration: 1 }}
                className="oval absolute lg:bottom-[-10rem] bottom-[-5rem]  w-[140%] lg:h-[40vh] h-[15vh] bg-white  mx-auto "
            ></motion.div>
        </section>
    );
};

export default Hero;
