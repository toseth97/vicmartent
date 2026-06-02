"use client";

import AnimatedHero from "./AnimatedHero";

import Career_Img from "../assets/images/ca1.png";

const CareerHero = ({ props }) => {
    return (
        <AnimatedHero
            heroImages={[Career_Img]}
            badgeText="Join Our Team"
            title={props ? props : "Careers"}
            subtitle="Build your career in a fast-growing distribution company. Explore roles and opportunities with Adenola & Sons."
            ctaSecondary={{ href: "/contact", label: "Contact HR" }}
            showStats={false}
        />
    );
};

export default CareerHero;

