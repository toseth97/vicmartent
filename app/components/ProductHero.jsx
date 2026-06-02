"use client";

import AnimatedHero from "./AnimatedHero";

import Product_Img from "../assets/images/container.jpg";

const ProductHero = () => {
    return (
        <AnimatedHero
            heroImages={[Product_Img]}
            badgeText="Our Products"
            title="OUR PRODUCTS"
            subtitle="Discover premium consumer goods across food, beverage, and non-food categories."
            ctaPrimary={{ href: "/products/non-food", label: "Explore Products" }}
            ctaSecondary={{ href: "/contact", label: "Talk to Us" }}
            showStats={false}
        />
    );
};

export default ProductHero;

