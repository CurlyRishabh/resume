"use client"
import { useEffect, useState } from "react";

// What VoiceType does, per its README: filler words are removed and
// self-corrections applied ("at 5, no wait, 6" becomes "at 6").
const SPOKEN = "um, let's meet at 5, no wait, 6";
const CLEAN = "Let's meet at 6.";

// One tick is 90 ms. The loop is: listen and transcribe, clean, type, hold.
const SPOKEN_END = Math.ceil(SPOKEN.length / 2) + 2;
const CLEAN_START = SPOKEN_END + 8;
const CLEAN_END = CLEAN_START + CLEAN.length;
const CYCLE = CLEAN_END + 34;

const BARS = Array.from({ length: 22 }, (_, i) => i);

/**
 * A phone running an illustration of VoiceType: a sound wave while
 * "listening", the raw words, then the cleaned sentence typed out.
 * Renders the finished state on the server and under reduced motion.
 */
export default function VoiceDemo() {
    const [tick, setTick] = useState(CYCLE - 1);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => setTick((value) => (value + 1) % CYCLE), 90);
        return () => clearInterval(id);
    }, []);

    const listening = tick < SPOKEN_END;
    const spoken = SPOKEN.slice(0, Math.max(0, (tick - 2) * 2));
    const clean = tick >= CLEAN_START ? CLEAN.slice(0, tick - CLEAN_START + 1) : "";
    const typing = tick >= CLEAN_START && tick < CLEAN_END;

    return (
        <div className="mx-auto w-64 sm:w-72 rounded-[2.5rem] border-4 border-gray-700 bg-black p-3 shadow-2xl shadow-accent2/20" aria-hidden="true">
            <div className="rounded-[1.9rem] bg-gray-950 border border-gray-800 h-[26rem] flex flex-col overflow-hidden">
                <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-gray-800"></div>

                {/* The app being typed into */}
                <div className="flex-1 p-4 space-y-3 text-left">
                    <p className="text-[11px] uppercase tracking-wider text-gray-500">Any app</p>
                    <div className="rounded-xl bg-gray-900 border border-gray-800 p-3 min-h-[5.5rem]">
                        <p className="text-white text-sm leading-relaxed">
                            {clean}
                            {typing && <span className="inline-block w-0.5 h-4 align-middle bg-accent2 ml-0.5"></span>}
                        </p>
                    </div>
                    <p className={`text-xs leading-relaxed ${clean ? "text-gray-600 line-through" : "text-gray-400"}`}>
                        {spoken && <>You said: “{spoken}”</>}
                    </p>
                </div>

                {/* The VoiceType keyboard */}
                <div className="bg-gray-900 border-t border-gray-800 p-4">
                    <div className={`flex items-center justify-center gap-[3px] h-10 ${listening ? "wave-on" : ""}`}>
                        {BARS.map((bar) => (
                            <span key={bar} className="wave-bar w-1 rounded-full bg-gradient-to-t from-accent2 to-accent" style={{ "--i": bar }}></span>
                        ))}
                    </div>
                    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                        <span className={`w-2 h-2 rounded-full ${listening ? "bg-accent animate-pulse" : "bg-green-400"}`}></span>
                        {listening ? "Listening, on this device" : "Done, nothing left the phone"}
                    </div>
                </div>
            </div>
        </div>
    );
}
