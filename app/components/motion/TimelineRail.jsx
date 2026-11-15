"use client"
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/** Wraps a list and draws a vertical line beside it that fills on scroll. */
export default function TimelineRail({ className = "", children }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
    const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

    return (
        <div ref={ref} className={`relative lg:pl-10 ${className}`}>
            <div className="hidden lg:block absolute left-2 top-2 bottom-2 w-0.5 rounded-full bg-gray-800" aria-hidden="true">
                <motion.div
                    className="w-full h-full origin-top rounded-full bg-gradient-to-b from-accent2 to-accent"
                    style={{ scaleY }}
                />
            </div>
            {children}
        </div>
    );
}
