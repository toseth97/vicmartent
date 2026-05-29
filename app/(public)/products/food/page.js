"use client";
import { Bebas_Neue } from "next/font/google";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import quaker from "../../../assets/images/foods/quaker.png";
import ovaltine from "../../../assets/images/foods/ovaltine-1.jpg";
import kerry from "../../../assets/images/foods/kerry.png";
import orbit from "../../../assets/images/foods/Orbit.jpg";
import mars from "../../../assets/images/foods/Mars.jpg";
import lipton from "../../../assets/images/foods/lipton.png";
import mms from "../../../assets/images/foods/MMs.jpg";
import snickers from "../../../assets/images/foods/Snickers.jpg";
import bounty from "../../../assets/images/foods/bounty.jpg";
import vicks from "../../../assets/images/foods/vicks.png";
import mc from "../../../assets/images/foods/mc.png";
import doubleMint from "../../../assets/images/foods/Double-mint.jpg";
import blueband from "../../../assets/images/foods/blueband.jpg";
import twix from "../../../assets/images/foods/Twix.jpg";
import maltesers from "../../../assets/images/foods/Maltesers.jpg";
import juicy from "../../../assets/images/foods/Juicy.jpg";
import haansbro from "../../../assets/images/foods/haansbro.webp";
import zydus from "../../../assets/images/foods/zydus.png";
import danone from "../../../assets/images/foods/danone.png";
import yum from "../../../assets/images/foods/yum.png";
import patisen from "../../../assets/images/foods/patisen.png";
import alpen from "../../../assets/images/foods/alpen.png";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

const products = [
    {
        src: quaker,
        alt: "Quaker",
        width: 180,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: ovaltine,
        alt: "Ovaltine",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInDown",
    },
    {
        src: kerry,
        alt: "Kerry",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: orbit,
        alt: "Orbit",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInDown",
    },
    {
        src: mars,
        alt: "Mars",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: lipton,
        alt: "Lipton",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: mms,
        alt: "MMs",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: snickers,
        alt: "Snickers",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInDown",
    },
    {
        src: bounty,
        alt: "Bounty",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: vicks,
        alt: "Vicks",
        width: 170,
        height: 90,
        id: "",
        className: "fadeInDown",
    },
    {
        src: mc,
        alt: "Mc",
        width: 170,
        height: 90,
        id: "",
        className: "fadeInUp",
    },
    {
        src: doubleMint,
        alt: "Double Mint",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInDown",
    },
    {
        src: blueband,
        alt: "Blueband",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: twix,
        alt: "Twix",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInDown",
    },
    {
        src: maltesers,
        alt: "Maltesers",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: juicy,
        alt: "Juicy",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: haansbro,
        alt: "Haansbro",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: zydus,
        alt: "Zydus",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: danone,
        alt: "Danone",
        width: 170,
        height: 100,
        id: "",
        className: "fadeInUp",
    },
    {
        src: yum,
        alt: "Yum",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: patisen,
        alt: "Patisen",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInDown",
    },
    {
        src: alpen,
        alt: "Alpen",
        width: 120,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
];

export default function Food() {
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
        <main
            className={`flex flex-col items-center justify-center overflow-x-hidden ${bebas.className}`}
        >
            <section className="w-full lg:h-[90vh] h-[60vh] flex flex-col items-center justify-center bg-gray-100">
                <h1
                    className={`lg:text-6xl text-4xl font-bold text-center ${bebas.className}`}
                >
                    Food Products
                </h1>
                <p className="text-lg text-center mt-4">
                    Explore our range of food products.
                </p>
                <Link
                    href="/products"
                    className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Back to Products
                </Link>
            </section>
            <section id="portfolio" className="portfolio section-bg pt-[120px]">
                <div className="container">
                    <div className="section-title">
                        <h2>Foods</h2>
                    </div>
                    <div className="row portfolio-container grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-4 mb-8">
                        {products.map((product, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className={`col-lg-2 col-md-6 portfolio-item filter-app animated ${product.className}`}
                            >
                                <div className="portfolio-wrap">
                                    <Image
                                        src={product.src}
                                        alt={product.alt}
                                        width={product.width}
                                        height={product.height}
                                        className="img-fluid hover:contrast-150 transition-all duration-300 cursor-pointer"
                                        id={product.id || undefined}
                                        style={{
                                            height: `${product.height}px`,
                                        }}
                                    />
                                    <div className="portfolio-info"></div>
                                    <div className="portfolio-links">
                                        {/* <a href={product.src} data-gallery="portfolioGallery" className="portfolio-lightbox" title=""><i className="bx bx-plus"></i></a> */}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
