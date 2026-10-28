"use client"
import { useEffect, useRef, useState } from "react";
import { toast } from "./Toaster";

export default function CopyEmailButton({ email, label = "Copy email" }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef();

    useEffect(() => () => clearTimeout(timer.current), []);

    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            toast("Email copied to clipboard");
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 1800);
        } catch {
            toast(`Couldn't copy. The address is ${email}`);
        }
    };

    return (
        <button type="button" onClick={handleClick} className={`btn ${copied ? "copied" : ""}`}>
            <span className="icon-swap" aria-hidden="true">
                <svg className="copy" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="5" y="5" width="8.5" height="8.5" rx="1.5" />
                    <path d="M10.5 5V3.5A1.5 1.5 0 0 0 9 2H3.5A1.5 1.5 0 0 0 2 3.5V9a1.5 1.5 0 0 0 1.5 1.5H5" />
                </svg>
                <svg className="check" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M3 8.5l3 3 7-7" />
                </svg>
            </span>
            {copied ? "Copied" : label}
        </button>
    );
}
