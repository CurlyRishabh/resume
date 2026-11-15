"use client"
import { useRef } from "react";

/** Pulls its child a few pixels towards the mouse while hovered. */
export default function Magnetic({ children, strength = 0.25 }) {
    const ref = useRef(null);

    const onPointerMove = (event) => {
        const node = ref.current;
        if (!node || event.pointerType !== "mouse") return;
        const box = node.getBoundingClientRect();
        const dx = (event.clientX - (box.left + box.width / 2)) * strength;
        const dy = (event.clientY - (box.top + box.height / 2)) * strength;
        node.style.setProperty("--tx", `${dx}px`);
        node.style.setProperty("--ty", `${dy}px`);
    };

    const onPointerLeave = () => {
        const node = ref.current;
        if (!node) return;
        node.style.setProperty("--tx", "0px");
        node.style.setProperty("--ty", "0px");
    };

    return (
        <span ref={ref} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className="magnetic inline-block">
            {children}
        </span>
    );
}
