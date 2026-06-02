"use client";

import AnimatedHero from "./AnimatedHero";

import Contact_Img from "../assets/images/contact.png";

const ContactHero = () => {
    return (
        <AnimatedHero
            heroImages={[Contact_Img]}
            badgeText="Get In Touch"
            title="FEEL FREE TO REACH OUT"
            subtitle="Send us a message and our team will get back to you shortly."
            ctaPrimary={{ href: "/contact", label: "Contact Us" }}
            ctaSecondary={{ href: "/about", label: "Learn More" }}
            showStats={false}
        />
    );
};

export default ContactHero;

