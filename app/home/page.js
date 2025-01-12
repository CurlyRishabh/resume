"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        // Add dependency array to prevent infinite redirects
        router.push("/");
    }, []); // Empty dependency array means this runs once on mount

    return <></>;
}