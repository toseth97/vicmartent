"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

const products = [
    {
        src: "/assets/images/non-foods/enchanteur-1.jpg",
        alt: "Enchanteur",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: "/assets/images/non-foods/nivea.jpg",
        alt: "Nivea",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInDown",
    },
    {
        src: "/assets/images/non-foods/dark-and-lovely-1.jpg",
        alt: "Dark and Lovely",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: "/assets/images/non-foods/Duracell logo.jpg",
        alt: "Duracell",
        width: 170,
        height: 95,
        id: "nonfd",
        className: "fadeInUp",
    },
    {
        src: "/assets/images/non-foods/tiger-razor.jpg",
        alt: "Tiger Razor",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInDown",
    },
    {
        src: "/assets/images/non-foods/henkel.png",
        alt: "Henkel",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: "/assets/images/non-foods/niviamen1.jpg",
        alt: "Nivea Men",
        width: 170,
        height: 95,
        id: "nivea",
        className: "fadeInUp",
    },
    {
        src: "/assets/images/non-foods/oral.jpg",
        alt: "Oral",
        width: 170,
        height: 95,
        id: "oral",
        className: "fadeInUp",
    },
    {
        src: "/assets/images/non-foods/gillette.png",
        alt: "Gillette",
        width: 170,
        height: 85,
        id: "",
        className: "fadeInUp",
    },
    {
        src: "/assets/images/non-foods/ariel-1.jpg",
        alt: "Ariel",
        width: 170,
        height: 85,
        id: "ariel",
        className: "fadeInUp",
    },
    {
        src: "/assets/images/non-foods/always.png",
        alt: "Always",
        width: 170,
        height: 90,
        id: "always",
        className: "fadeInUp",
    },
    {
        src: "/assets/images/non-foods/safequard.png",
        alt: "Safeguard",
        width: 170,
        height: 90,
        id: "safe",
        className: "fadeInUp",
    },
    {
        src: "/assets/images/non-foods/Godrej.webp",
        alt: "Godrej",
        width: 170,
        height: 85,
        id: "",
        className: "fadeInUp",
    },
    {
        src: "/assets/images/non-foods/dabur.png",
        alt: "Dabur",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInDown",
    },
    {
        src: "/assets/images/non-foods/loreal.webp",
        alt: "Loreal",
        width: 170,
        height: 95,
        id: "nonfd",
        className: "fadeInUp",
    },
    {
        src: "/assets/images/non-foods/unilever.webp",
        alt: "Unilever",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: "/assets/images/non-foods/vini.png",
        alt: "Vini",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
];

export default function NonFood() {
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
                    Non-Food Products
                </h1>
                <p className="text-lg text-center mt-4">
                    Explore our range of non-food products.
                </p>
                <Link
                    href="/products"
                    className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Back to Products
                </Link>
            </section>
            <section
                id="portfolio"
                className="portfolio section-bg pt-[120px] mb-16"
            >
                <div className="container">
                    <div className="section-title">
                        <h2>Non-Foods</h2>
                    </div>
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="row portfolio-container grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-4 "
                    >
                        {products.map((product, index) => (
                            <div
                                key={index}
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
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
