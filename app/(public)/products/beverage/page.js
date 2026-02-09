"use client";
import { Bebas_Neue } from "next/font/google";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import vitamilkOgo from "../../../assets/images/beverages/vitamilk-ogo.jpg";
import powerhouseLogo from "../../../assets/images/beverages/powerhouse-logo.jpg";
import ribenaLogo from "../../../assets/images/beverages/logo-ribena.gif";
import lucozadeLogo from "../../../assets/images/beverages/Lucozade logo[1].png";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

const products = [
    {
        src: vitamilkOgo,
        alt: "Vitamilk Ogo",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
    {
        src: powerhouseLogo,
        alt: "Powerhouse",
        width: 130,
        height: 90,
        id: "",
        className: "fadeInDown",
    },
    {
        src: ribenaLogo,
        alt: "Ribena",
        width: 150,
        height: 90,
        id: "",
        className: "fadeInUp",
    },
    {
        src: lucozadeLogo,
        alt: "Lucozade",
        width: 170,
        height: 95,
        id: "",
        className: "fadeInUp",
    },
];

export default function Beverage() {
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
                    Beverage Products
                </h1>
                <p className="text-lg text-center mt-4">
                    Explore our range of beverage products.
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
                        <h2>Beverages</h2>
                    </div>
                    <div className="row portfolio-container grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
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
