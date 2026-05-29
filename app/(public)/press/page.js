"use client";
import { useEffect, useRef } from "react";
import PressContent from "../../components/PressContent";
import PressHero from "../../components/PressHero";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

export default function Press() {
    const hiddenElementsRef = useRef([]); // Use useRef for element references

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log(entry);
                    entry.target.classList.add("preview_show");
                } else {
                    entry.target.classList.remove("preview_show");
                }
            });
        });

        // Improved selector: Target specific elements using class names
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
            <PressHero />
            <PressContent />
        </main>
    );
}
