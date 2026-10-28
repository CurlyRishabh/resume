"use client"
import { useEffect, useRef, useState } from "react";

export function toast(message) {
    window.dispatchEvent(new CustomEvent("toast", { detail: message }));
}

export default function Toaster() {
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const timer = useRef();

    useEffect(() => {
        const onToast = (e) => {
            setMessage(e.detail);
            setVisible(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setVisible(false), 2200);
        };
        window.addEventListener("toast", onToast);
        return () => {
            window.removeEventListener("toast", onToast);
            clearTimeout(timer.current);
        };
    }, []);

    return (
        <div className={`toast ${visible ? "show" : ""}`} role="status" aria-live="polite">
            {message}
        </div>
    );
}
