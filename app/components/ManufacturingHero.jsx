"use client";

import AnimatedHero from "./AnimatedHero";

import Manufacturing_Img from "../assets/images/manufacture.webp";

const ManufacturingHero = ({ props }) => {
    return (
        <AnimatedHero
            heroImages={[Manufacturing_Img]}
            badgeText="Manufacturing & Quality"
            title={props ? props : "Transforming Ideas into Quality Products"}
            subtitle="From sourcing to distribution, we support premium products with quality-driven processes and dependable supply networks."
            ctaPrimary={{ href: "/manufacturing", label: "Our Approach" }}
            ctaSecondary={{ href: "/contact", label: "Partner With Us" }}
            showStats={false}
        />
    );
};

export default ManufacturingHero;

