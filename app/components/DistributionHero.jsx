"use client";

import AnimatedHero from "./AnimatedHero";

import Distribution_Img from "../assets/images/distribution.webp";

const DistributionHero = ({ props }) => {
    return (
        <AnimatedHero
            heroImages={[Distribution_Img]}
            badgeText="Distribution Excellence"
            title={props ? props : "Streamlining Your Distribution Network"}
            subtitle="Connecting FMCG brands to customers through efficient logistics, reliable networks, and responsive service delivery."
            ctaPrimary={{ href: "/distribution", label: "View Distribution" }}
            ctaSecondary={{ href: "/contact", label: "Talk to Us" }}
            showStats={false}
        />
    );
};

export default DistributionHero;

