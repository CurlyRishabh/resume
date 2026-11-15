"use client"
import { useEffect, useRef } from "react";

// What the ring grows over, and where the custom cursor steps aside so
// the normal text cursor can be used.
const INTERACTIVE = "a, button, [role='button'], summary, label";
const FIELDS = "input, textarea, select";

/**
 * Custom cursor: a dot that sits exactly on the pointer and a ring that
 * trails it. The ring inverts the colours beneath it and grows into a
 * filled disc over links and buttons.
 *
 * Mouse users only. Touch devices and visitors who ask for reduced motion
 * keep the normal cursor, because nothing here runs for them. The look
 * lives in globals.css and is driven by classes on <html>:
 * cursor-on, cursor-hover, cursor-field and cursor-down.
 */
export default function Cursor() {
    const dot = useRef(null);
    const ring = useRef(null);

    useEffect(() => {
        const usesMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!usesMouse || reducedMotion) return;

        const root = document.documentElement;
        let x = 0, y = 0;       // pointer
        let rx = 0, ry = 0;     // ring, easing towards the pointer
        let visible = false;
        let frame = 0;

        const follow = () => {
            rx += (x - rx) * 0.18;
            ry += (y - ry) * 0.18;
            ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
            frame = requestAnimationFrame(follow);
        };

        const onMove = (event) => {
            if (event.pointerType && event.pointerType !== "mouse") return;
            x = event.clientX;
            y = event.clientY;
            dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            if (!visible) {
                visible = true;
                rx = x;
                ry = y;
                root.classList.add("cursor-on");
            }
            const target = event.target instanceof Element ? event.target : null;
            root.classList.toggle("cursor-hover", Boolean(target?.closest(INTERACTIVE)));
            root.classList.toggle("cursor-field", Boolean(target?.closest(FIELDS)));
        };

        const onLeave = () => {
            visible = false;
            root.classList.remove("cursor-on", "cursor-hover", "cursor-field", "cursor-down");
        };
        const onDown = () => root.classList.add("cursor-down");
        const onUp = () => root.classList.remove("cursor-down");

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        window.addEventListener("pointerup", onUp, { passive: true });
        root.addEventListener("mouseleave", onLeave);
        window.addEventListener("blur", onLeave);
        frame = requestAnimationFrame(follow);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointerup", onUp);
            root.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("blur", onLeave);
            onLeave();
        };
    }, []);

    return (
        <>
            <div ref={ring} className="cursor-ring" aria-hidden="true"><span></span></div>
            <div ref={dot} className="cursor-dot" aria-hidden="true"><span></span></div>
        </>
    );
}
