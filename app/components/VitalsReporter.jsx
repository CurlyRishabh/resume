"use client"
import { useCallback } from "react";
import { useReportWebVitals } from "next/web-vitals";

const REPORTED = new Set(["LCP", "INP", "CLS", "FCP", "TTFB"]);

function optedOut() {
    return navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true;
}

/** Sends each Core Web Vital once, as a bare name and number. Nothing else leaves the browser. */
export default function VitalsReporter() {
    const report = useCallback((metric) => {
        if (!REPORTED.has(metric.name) || optedOut()) return;
        const body = JSON.stringify({ name: metric.name, value: metric.value });
        if (!navigator.sendBeacon?.("/api/vitals", body)) {
            fetch("/api/vitals", { method: "POST", body, keepalive: true }).catch(() => {});
        }
    }, []);
    useReportWebVitals(report);
    return null;
}
