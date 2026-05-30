"use client";
import { useEffect, useState, useRef } from "react";
import CareerContent from "../../components/CareerContent";
import CareerHero from "../../components/CareerHero";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

export default function Careers() {
    const [jobs, setJobs] = useState([]);

    const parseJobsResponse = (data) => {
        if (Array.isArray(data)) return data;
        if (data?.jobs && Array.isArray(data.jobs)) return data.jobs;
        if (data?.data && Array.isArray(data.data)) return data.data;
        console.warn("Unexpected jobs response:", data);
        return [];
    };

    useEffect(() => {
        fetch("/api/jobs")
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    console.error("Failed to load jobs: status", res.status, text);
                    return [];
                }
                const contentType = res.headers.get("content-type") || "";
                return contentType.includes("application/json")
                    ? res.json()
                    : JSON.parse(await res.text());
            })
            .then((data) => setJobs(parseJobsResponse(data).filter((job) => job.isActive)))
            .catch((error) => {
                console.error(
                    "Failed to load jobs:",
                    error?.message || error,
                    error,
                );
                setJobs([]);
            });
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
