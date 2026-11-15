"use client"
import { useEffect, useState } from "react";
import Image from "next/image";

// Real screenshots from the app's README, in the order a person meets them.
const SCREENS = [
    { src: "/projects/launcher/home.jpg", label: "Home", alt: "Home screen: a clock and a short list of app names over the wallpaper" },
    { src: "/projects/launcher/drawer.jpg", label: "App drawer", alt: "App drawer: a search box above an alphabetical list of app names" },
    { src: "/projects/launcher/notes.jpg", label: "Notes", alt: "Notes page: a plain scratchpad" },
    { src: "/projects/launcher/widgets.jpg", label: "Widgets", alt: "Widgets page" }
];

/**
 * A phone that cross-fades through the launcher's four screens. Shows the
 * home screen on the server and under reduced motion.
 */
export default function LauncherDemo() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => setActive((value) => (value + 1) % SCREENS.length), 2800);
        return () => clearInterval(id);
    }, []);

    return (
        <div>
            <div className="mx-auto w-56 sm:w-64 rounded-[2.5rem] border-4 border-gray-700 bg-black p-2 shadow-2xl shadow-accent2/20">
                <div className="relative rounded-[2rem] overflow-hidden bg-black aspect-[484/1040]">
                    {SCREENS.map((screen, index) => (
                        <Image
                            key={screen.src}
                            src={screen.src}
                            alt={screen.alt}
                            fill
                            sizes="16rem"
                            className={`launcher-screen object-cover ${index === active ? "opacity-100" : "opacity-0"}`}
                            aria-hidden={index !== active}
                        />
                    ))}
                </div>
            </div>

            {/* Which screen is showing */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2" aria-hidden="true">
                {SCREENS.map((screen, index) => (
                    <span
                        key={screen.label}
                        className={`rounded-full px-3 py-1 text-xs font-mono whitespace-nowrap ${
                            index === active ? "bg-accent2 text-black" : "border border-white/10 text-gray-500"
                        }`}
                    >
                        {screen.label}
                    </span>
                ))}
            </div>
        </div>
    );
}
