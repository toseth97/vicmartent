"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// If you want to reuse components, create About-specific ones in app/components
import AboutHero from "../../components/AboutHero";
import AboutContent from "../../components/AboutContent";

export default function About() {
    const hiddenElementsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("preview_show");
                } else {
                    entry.target.classList.remove("preview_show");
                }
            });
        });

        const hiddenElements = document.querySelectorAll(".preview_hidden");
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, [hiddenElementsRef.current]);

    return (
        <main className="flex flex-col items-center justify-center overflow-x-hidden">
            {/* Hero section for About page */}
            <AboutHero />

            {/* Main About content (mission, vision, values, history, etc.) */}
            <AboutContent />

            {/* Example: you can also add images directly */}
            {/* <section className="preview_hidden w-full max-w-6xl px-6 py-12">
                <Image
                    src="/app/assets/images/abt1.jpg"
                    alt="About Hero"
                    width={1490}
                    height={300}
                    className="rounded-lg shadow-md object-cover w-full"
                />
            </section> */}
        </main>
    );
}
