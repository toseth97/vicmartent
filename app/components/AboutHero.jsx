"use client";

import AnimatedHero from "./AnimatedHero";

import About_Image_1 from "../assets/images/abt1.jpg";

const AboutHero = () => {
    return (
        <AnimatedHero
            heroImages={[About_Image_1]}
            badgeText="About Adenola & Sons"
            title={
                <>
                    About <br /> <span className="mt-8 inline-block"> Adenola & Sons</span>
                </>
            }
            subtitle="We are an indigenous firm involved in the marketing and sales of FMCG and allied products to meet customer needs."
            ctaPrimary={{ href: "/about", label: "Learn More" }}
            ctaSecondary={{ href: "/contact", label: "Get in Touch" }}
            showStats={false}
        />
    );
};

export default AboutHero;

