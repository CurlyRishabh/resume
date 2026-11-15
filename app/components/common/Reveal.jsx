"use client"
import { useEffect, useRef } from "react";

/**
 * Fades its children in the first time they scroll into view.
 *
 * The server-rendered markup is fully visible. Only elements that start
 * below the fold are "armed" (hidden) by script, so nothing can get stuck
 * invisible if JavaScript or IntersectionObserver is unavailable.
 * The state lives in a data attribute, read by the CSS in globals.css.
 */
export default function Reveal({ as: Tag = "div", className = "", children }) {
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node || !("IntersectionObserver" in window)) return;

        // Already on screen: show it as is, with no animation.
        if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
            node.dataset.reveal = "in";
            return;
        }

        node.dataset.reveal = "armed";
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    node.dataset.reveal = "in";
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag ref={ref} data-reveal="idle" className={className}>
            {children}
        </Tag>
    );
}
