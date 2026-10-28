"use client"
import { toggleXRay } from "./XRay";

export default function XRayButton() {
    return (
        <button type="button" className="link" onClick={toggleXRay}>
            X-ray <kbd className="font-mono">X</kbd>
        </button>
    );
}
