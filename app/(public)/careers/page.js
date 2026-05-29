"use client";
import { useEffect, useState, useRef } from "react";
import CareerContent from "../../components/CareerContent";
import CareerHero from "../../components/CareerHero";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

export default function Careers() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch("/api/jobs")
            .then((res) => res.json())
            .then((data) => setJobs(data.filter((job) => job.isActive)));
    }, []);
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
            <CareerHero />
            <CareerContent />
        </main>
    );
}
