"use client"
import { motion, useScroll, useSpring } from "motion/react";

/** Thin bar across the top that fills as the page is scrolled. */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
    return (
        <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] bg-gradient-to-r from-accent2 to-accent"
            style={{ scaleX }}
        />
    );
}
