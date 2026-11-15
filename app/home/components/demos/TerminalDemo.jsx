"use client"
import { useEffect, useState } from "react";

// Real behaviour of the REPL: built-in commands, and everything else is
// evaluated as JavaScript and printed the way its worker serialises it.
const SCRIPT = [
    { cmd: "help" },
    { out: "Available Commands:\n  help  skills  about  projects  contact  clear\nAny other input will be evaluated as JavaScript." },
    { cmd: "2 + 2" },
    { out: "4" },
    { cmd: 'console.log("Hello!")' },
    { out: "Hello!" },
    { cmd: "[1, 2, 3].map(n => n * 2)" },
    { out: "[\n  2,\n  4,\n  6\n]" }
];

// A command takes one frame per character; an output takes a short pause.
const OUT_FRAMES = 6;
const TOTAL = SCRIPT.reduce((sum, step) => sum + (step.cmd ? step.cmd.length : OUT_FRAMES), 0);
const CYCLE = TOTAL + 45;

/**
 * A terminal window that types the script above on a loop. Renders the
 * finished state on the server and under reduced motion.
 */
export default function TerminalDemo() {
    const [frame, setFrame] = useState(TOTAL);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(() => setFrame((value) => (value + 1) % CYCLE), 70);
        return () => clearInterval(id);
    }, []);

    let budget = frame;
    const lines = [];
    for (const [index, step] of SCRIPT.entries()) {
        if (budget <= 0) break;
        if (step.cmd) {
            const shown = step.cmd.slice(0, budget);
            lines.push({ key: index, cmd: shown, typing: shown.length < step.cmd.length });
            budget -= step.cmd.length;
        } else {
            if (budget >= OUT_FRAMES) lines.push({ key: index, out: step.out });
            budget -= OUT_FRAMES;
        }
    }
    const idle = frame >= TOTAL || !lines.length || !lines[lines.length - 1].typing;

    return (
        <div className="rounded-2xl border border-gray-700 bg-black shadow-2xl shadow-accent2/20 overflow-hidden text-left" aria-hidden="true">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
                <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-400/80"></span>
                <span className="ml-3 text-xs text-gray-500 font-mono">repl-portfolio</span>
            </div>
            <pre className="p-5 h-[22rem] overflow-hidden font-mono text-[13px] leading-relaxed text-gray-300 whitespace-pre-wrap">
                {lines.map((line) =>
                    line.out !== undefined ? (
                        <span key={line.key} className="block text-gray-400">{line.out}</span>
                    ) : (
                        <span key={line.key} className="block text-white">
                            <span className="text-accent2">❯ </span>{line.cmd}
                            {line.typing && <span className="inline-block w-2 h-4 align-middle bg-accent2 ml-0.5"></span>}
                        </span>
                    )
                )}
                {idle && (
                    <span className="block text-white">
                        <span className="text-accent2">❯ </span>
                        <span className="cursor-blink inline-block w-2 h-4 align-middle bg-accent2"></span>
                    </span>
                )}
            </pre>
        </div>
    );
}
