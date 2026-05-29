"use client";
import { Bebas_Neue } from "next/font/google";
import { useEffect, useRef } from "react";

// Import Product-specific components
import ProductHero from "../../components/ProductHero";
import ProductContent from "../../components/ProductContent";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

export default function Product() {
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
        <main
            className={`flex flex-col items-center justify-center overflow-x-hidden ${bebas.className}`}
        >
            {/* Hero section for Product page */}
            <ProductHero />

            {/* Main Product content */}
            <ProductContent />
        </main>
    );
}
