"use client"
import { useRef } from "react";

/**
 * Tracks the mouse inside its box and exposes the position as the CSS
 * variables --mx / --my. Styles in globals.css use them to move a glow
 * (.pointer-glow) or to tilt a card (.tilt-card). Touch input is ignored.
 */
export default function PointerGlow({ as: Tag = "div", className = "", tilt = 0, children, ...rest }) {
    const ref = useRef(null);

    const onPointerMove = (event) => {
        const node = ref.current;
        if (!node || event.pointerType !== "mouse") return;
        const box = node.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width;
        const y = (event.clientY - box.top) / box.height;
        node.style.setProperty("--mx", `${x * 100}%`);
        node.style.setProperty("--my", `${y * 100}%`);
        if (tilt) {
            node.style.setProperty("--rx", `${(0.5 - y) * tilt}deg`);
            node.style.setProperty("--ry", `${(x - 0.5) * tilt}deg`);
        }
    };

    const onPointerLeave = () => {
        const node = ref.current;
        if (!node || !tilt) return;
        node.style.setProperty("--rx", "0deg");
        node.style.setProperty("--ry", "0deg");
    };

    return (
        <Tag ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className={className} {...rest}>
            {children}
        </Tag>
    );
}
