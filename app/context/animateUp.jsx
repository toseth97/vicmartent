"use client";
import React from "react";
import { motion } from "framer-motion";

const animations = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
};
const AnimateUp = ({ children }) => {
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

export default AnimateUp;
