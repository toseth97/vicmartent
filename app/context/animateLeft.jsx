"use client";
import React from "react";
import { motion } from "framer-motion";

const animations = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
};

const animateLeft = ({ children }) => {
    return (
        <motion.div
            variant={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
};

export default animateLeft;
