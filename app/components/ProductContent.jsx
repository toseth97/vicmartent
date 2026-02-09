"use client";

import { Bebas_Neue } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Beverage from "../assets/images/beverage.webp";
import Foods from "../assets/images/food.webp";
import NonFoods from "../assets/images/non-food.webp";
import { FaLink } from "react-icons/fa6";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

const ProductContent = () => {
    return (
        <section
            id="portfolio"
            className="portfolio section-bg"
            style={{ paddingTop: "120px", marginBottom: "80px" }}
        >
            <div className="container mx-auto px-4">
                <div className="section-title">
                    <center>
                        <h2 className={`text-4xl font-bold ${bebas.className}`}>
                            Our Products
                        </h2>
                    </center>
                </div>

                <div className="row portfolio-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="col-lg-4 col-md-6 portfolio-item filter-app fadeInUp animated">
                        <div className="portfolio-wrap relative overflow-hidden rounded-lg shadow-md">
                            <Image
                                src={NonFoods} // Placeholder, replace with actual image
                                alt="Non Foods"
                                width={400}
                                height={300}
                                className="img-fluid w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="portfolio-info absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <div className="portfolio-links">
                                    <Link
                                        href="/products/non-food"
                                        title="More Details"
                                        className="text-white"
                                    >
                                        <FaLink className="text-6xl text-bold" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 portfolio-item filter-app fadeInDown animated">
                        <div className="portfolio-wrap relative overflow-hidden rounded-lg shadow-md">
                            <Image
                                src={Foods} // Placeholder
                                alt="Foods"
                                width={400}
                                height={300}
                                className="img-fluid w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="portfolio-info absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <div className="portfolio-links">
                                    <Link
                                        href="/products/food"
                                        title="More Details"
                                        className="text-white "
                                    >
                                        <FaLink className="text-6xl text-bold" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 portfolio-item filter-app fadeInDown animated">
                        <div className="portfolio-wrap relative overflow-hidden rounded-lg shadow-md">
                            <Image
                                src={Beverage} // Placeholder
                                alt="Beverages"
                                width={400}
                                height={300}
                                className="img-fluid w-full h-64 o"
                            />
                            <div className="portfolio-info absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <div className="portfolio-links">
                                    <Link
                                        href="/products/beverage"
                                        title="More Details"
                                        className="text-white"
                                    >
                                        <FaLink className="text-6xl text-bold" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductContent;
