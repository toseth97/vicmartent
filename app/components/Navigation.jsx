"use client";
import React, { useState, useEffect } from "react";
import Logo from "../assets/images/Logo.png";
import Link from "next/link";
import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Poppins } from "next/font/google";

import "../assets/css/Nav.css";
import AnimateUp from "../context/animateUp";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const Navigation = () => {
    const [menuClick, setMenuClick] = useState(false);

    // 🔒 Lock scroll when menu is open
    useEffect(() => {
        if (menuClick) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup when component unmounts
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuClick]);

    return (
        <header
            className={`w-full flex flex-col items-center justify-center shadow-lg fixed top-0 ${poppins.className}`}
        >
            <nav className="lg:w-9/12 w-11/12 flex items-center justify-between ">
                <Link
                    href="/"
                    className="flex items-center justify-between gap-2"
                >
                    <Image
                        src={Logo}
                        height={70}
                        width={70}
                        alt="Vicmart Enterprise"
                    />
                </Link>
                <ul className="lg:flex hidden items-center justify-between gap-5 ">
                    <li
                        className="listItem text-sm flex flex-col py-6 relative items-center justify-center   "
                        id="home"
                    >
                        <Link className="mx-4 px-2 " href="/">
                            Home
                        </Link>
                        <span className="nav_line absolute bottom-0"></span>
                    </li>
                    <li
                        className="listItem text-sm flex flex-col py-6 relative items-center justify-center "
                        id="about"
                    >
                        <Link className=" mx-4 px-2" href="/about">
                            About Us
                        </Link>
                        <span className="nav_line absolute bottom-0"></span>
                    </li>

                    <li
                        className="listItem text-sm flex flex-col py-6 relative items-center justify-center "
                        id="distribution"
                    >
                        <Link className=" mx-4 px-2" href="/distribution">
                            Distribution
                        </Link>
                        <span className="nav_line absolute bottom-0"></span>
                    </li>
                    <li
                        className="listItem text-sm flex flex-col py-6 relative items-center justify-center "
                        id="careers"
                    >
                        <Link className=" mx-4 px-2" href="/careers">
                            Careers
                        </Link>
                        <span className="nav_line absolute bottom-0"></span>
                    </li>
                    <li
                        className="listItem text-sm flex flex-col py-6 relative items-center justify-center "
                        id="contact"
                    >
                        <Link className=" mx-4 px-2" href="/contact">
                            Contact
                        </Link>
                        <span className="nav_line absolute bottom-0"></span>
                    </li>
                </ul>
                <div
                    className="mobileBtn lg:hidden flex"
                    onClick={() => setMenuClick((prev) => !prev)}
                >
                    {menuClick ? (
                        <span className="text-4xl text-gray-700 py-4">
                            <IoClose />
                        </span>
                    ) : (
                        <span className="text-4xl text-gray-700 py-4">
                            <IoMenu />
                        </span>
                    )}
                </div>
            </nav>

            {menuClick ? (
                <AnimateUp>
                    <ul className="block items-center text-center w-full justify-between gap-5 mobileUl ">
                        <li
                            className="listItem border-b text-sm"
                            onClick={() => setMenuClick(false)}
                        >
                            <Link className="my-4 py-2" href="/">
                                Home
                            </Link>
                        </li>
                        <li
                            className="listItem border-b text-sm"
                            onClick={() => setMenuClick(false)}
                        >
                            <Link className="my-4 py-2" href="/about">
                                About Us
                            </Link>
                        </li>

                        <li
                            className="listItem  border-b text-sm"
                            onClick={() => setMenuClick(false)}
                        >
                            <Link className="my-4 py-2" href="/distribution">
                                Distribution
                            </Link>
                        </li>
                        <li
                            className="listItem  border-b text-sm"
                            onClick={() => setMenuClick(false)}
                        >
                            <Link className="my-4 py-2" href="/careers">
                                Careers
                            </Link>
                        </li>
                        <li
                            className="listItem  border-b text-sm"
                            onClick={() => setMenuClick(false)}
                        >
                            <Link className="my-4 py-2" href="/contact">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </AnimateUp>
            ) : null}
        </header>
    );
};

export default Navigation;
