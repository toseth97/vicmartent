"use client";

import AnimatedHero from "./AnimatedHero";

import Press_Img from "../assets/images/contact.png";

const PressHero = ({ props }) => {
    return (
        <AnimatedHero
            heroImages={[Press_Img]}
            badgeText="Press & Updates"
            title={props ? props : "Press & Announcements"}
            subtitle="Latest news, milestones, and announcements from Adenola & Sons."
            ctaPrimary={{ href: "/press", label: "Read News" }}
            ctaSecondary={{ href: "/contact", label: "Contact Us" }}
            showStats={false}
        />
    );
};

export default PressHero;

